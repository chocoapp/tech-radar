import * as path from "path";
import * as fs from "fs";

export const resultPath = path.join(
  "results",
  new Date().toISOString().split("T")[0]
);

export const dbId = "8023084e22c24e8dae2cd69555791f65";

export function read(fileName: string) {
  return JSON.parse(fs.readFileSync(path.join(resultPath, fileName), "utf8"));
}
