import { Blip } from "../../Blip";
import { blips } from "../../blips";
import { Category, CategoryId } from "../../types";

import "./categories.css";

export function Categories({
  selected,
  setSelected,
}: {
  selected?: string;
  setSelected: Function;
}) {
  return (
    <>
      {Object.entries(categories).map(([typeId, entries]) => {
        return (
          <div key={typeId} className={`category ${typeId}`}>
            <h3>{Category[typeId as CategoryId]}</h3>

            <ul>
              {entries.map((entry) => {
                return (
                  <li
                    key={entry.id}
                    onMouseOver={() => setSelected(entry.originId)}
                    className={selected === entry.originId ? "selected" : ""}
                  >
                    {entry.label}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

const byCategory = (category: CategoryId) =>
  blips.filter((entry: Blip) => entry.category === category);

const categories: {
  [K in keyof typeof Category]: Blip[];
} = {
  tools: byCategory("tools"),
  "languages-frameworks": byCategory("languages-frameworks"),
  techniques: byCategory("techniques"),
  platforms: byCategory("platforms"),
};
