import entries from "./entries.json";
import { Entry } from "./types";
import { Blip } from "./Blip";

export const blips = entries.map((entry) => new Blip(entry as Entry));
