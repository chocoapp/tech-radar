import { fetchRadarData } from "./fetchRadarData";
import { transform } from "./transform";

async function run() {
  await fetchRadarData();
  await transform();
}

run();
