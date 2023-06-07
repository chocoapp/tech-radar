import * as fs from "fs";
import { read } from "./config";
import * as r from "ramda";
import { Entry, Category } from "../src/types";

const getLabel = r.path<string>(["Name", "results", 0, "title", "plain_text"]);
const getCategory = r.path<Category>(["Type", "select", "name"]);

export async function transform() {
  const data = read("items.json");

  const results: Entry[] = [];

  for (let item of data.results) {
    const itemData = read(`item-${item.id}.json`);

    const label = getLabel(itemData);

    if (!label) {
      console.log("Item", itemData.url, "has no label.");
      continue;
    }

    const category = getCategory(itemData);

    if (!category) {
      console.log("Item", itemData.url, "has no category.");
      continue;
    }

    const result = {
      originId: itemData.id,
      category,
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
