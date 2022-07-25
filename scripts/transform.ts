import * as fs from "fs";
import { read } from "./config";
import * as r from "ramda";
import { Entry } from "../src/types";

export async function transform() {
  const data = read("items.json");

  const results: Entry[] = [];

  for (let item of data.results) {
    const itemData = read(`item-${item.id}.json`);

    const label = itemData.Name.results[0].title.plain_text;

    const result = {
      originId: itemData.id,
      category: itemData.Type.select?.name,
      status: itemData.Status.select.name,
      label,
      icon: itemData.icon,
      id: 0,
    };

    results.push(result);
  }

  const sortedResults = r.sortWith([
    r.ascend(r.path(["status"])),
    r.ascend(r.path(["label"])),
  ]);

  let id = 1;

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
