import { Client } from "@notionhq/client";
import { read, dbId, resultPath } from "./config";

import * as fs from "fs";
import * as path from "path";
import * as cp from "child_process";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const propsToPick = ["Type", "Status", "Name"];

export async function fetchRadarData() {
  if (!fs.existsSync(resultPath)) fs.mkdirSync(resultPath);

  await getDatabaseMetadata();
  const items = await getDatabaseItems();

  for (let result of items.results) {
    await getDatabaseItem(result);
  }
}

async function withCache(fileName: string, fn: () => Promise<any>) {
  const filePath = path.join(resultPath, fileName);
  if (fs.existsSync(filePath)) {
    console.log(fileName, "in cache, skipping... ");
    return read(fileName);
  }

  console.log("Fetching ", fileName);
  const result = await fn();
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

  console.log("Done");

  return result;
}

async function getDatabaseMetadata() {
  return withCache("metadata.json", async () => {
    return await notion.databases.retrieve({
      database_id: dbId,
    });
  });
}

async function getDatabaseItems() {
  return withCache("items.json", async () => {
    return await notion.databases.query({
      database_id: dbId,
    });
  });
}

function getIconMetadata(
  item: any
): ["url" | "data" | "emoji" | "none", string?] {
  if (!item.icon) return ["none"];

  switch (item.icon.type) {
    case "file":
      return ["url", item.icon.file.url];

    case "external":
      if (item.icon.external.url.startsWith("data"))
        return ["data", item.icon.external.url];
      else return ["url", item.icon.external.url];

    case "emoji":
      return ["emoji", item.icon.emoji];

    default:
      return ["none"];
  }
}

async function getIcon(item: any) {
  const [type, icon] = getIconMetadata(item);

  switch (type) {
    case "none":
    case "emoji":
    case "data":
      return [type, icon];
    case "url":
      const ext = path.extname(new URL(icon).pathname);

      const iconName = `icon-${item.id}${ext}`;

      if (!fs.existsSync(`./public/images/${iconName}`)) {
        download(icon, `./public/images/${iconName}`);
      }

      return [type, `/${iconName}`];
    default:
      throw new Error("unexpected");
  }
}

async function getDatabaseItem(item: any) {
  try {
    return withCache(`item-${item.id}.json`, async () => {
      try {
        // @ts-ignore
        for (let [prop, { id: propId }] of Object.entries(item.properties)) {
          if (!propsToPick.includes(prop)) continue;

          item[prop] = await notion.pages.properties.retrieve({
            page_id: item.id,
            property_id: propId,
          });
        }

        item.content = await notion.blocks.children.list({
          block_id: item.id,
        });

        item.icon = await getIcon(item);

        return item;
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function download(uri: string, filename: string) {
  cp.execSync(`curl "${uri}" > ${filename}`);
}
