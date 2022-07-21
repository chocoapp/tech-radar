export enum Status {
  adopt = "✅ Adopt",
  trial = "🚧 Trial",
  assess = "🔎 Assess",
  hold = "🚫 Hold",
}

export enum Category {
  tools = "Tools",
  "languages-frameworks" = "Languages & frameworks",
  platforms = "Platforms",
  techniques = "Techniques",
}

export type CategoryId = keyof typeof Category;
export type StatusId = keyof typeof Status;

export type Entry = {
  id: number;
  originId: string;
  category: keyof typeof Category;
  status: keyof typeof Status;
  label: string;
  icon: [IconType, string];
};

type IconType = "url" | "data" | "emoji" | "none";
