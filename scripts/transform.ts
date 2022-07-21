import * as fs from "fs";
import { read } from "./config";
import * as r from "ramda";
import { CategoryId, Entry, StatusId } from "../src/types";

namespace Notion {
  export type Category =
    | "Tools"
    | "Languages & Frameworks"
    | "Platforms"
    | "Techniques";

  export type Status =
    | "🚫 Hold"
    | "Review"
    | "Assess"
    | "🚧 Trial"
    | "✅ Adopt";
}

const quadrantMap: Record<Notion.Category, CategoryId> = {
  Tools: "tools",
  "Languages & Frameworks": "languages-frameworks",
  Platforms: "platforms",
  Techniques: "techniques",
};

const ringMap: Record<Notion.Status, StatusId> = {
  "🚫 Hold": "hold",
  // TBD
  Review: "hold",
  Assess: "assess",
  "🚧 Trial": "trial",
  "✅ Adopt": "adopt",
};

export async function transform() {
  const data = read("items.json");

  const results: Entry[] = [];

  for (let item of data.results) {
    const itemData = read(`item-${item.id}.json`);

    const status = itemData.Status.select.name;
    const category = itemData.Type.select?.name || "unknown";
    const label = itemData.Name.results[0].title.plain_text;

    const result = {
      originId: itemData.id,
      // @ts-ignore
      category: quadrantMap[category],
      // @ts-ignore
      status: ringMap[status],
      label,
      icon: itemData.icon,
      id: 0,
    };

    results.push(result);
  }

  const sortedResults = r.sortWith([
    // @ts-ignore
    r.ascend(r.path(["status"])),
    // @ts-ignore
    r.ascend(r.path(["label"])),
  ]);

  let id = 1;

  // @ts-ignore
  const sortedRs = sortedResults(results);

  for (let item of sortedRs) {
    item.id = id;
    id++;
  }

  fs.writeFileSync(`./src/entries.json`, JSON.stringify(sortedRs, null, 2));
}

if (require.main === module) {
  transform();
}
