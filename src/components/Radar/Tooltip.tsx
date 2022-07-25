import { Blip } from "../../Blip";
import { Icon } from "./Icon";

import "./tooltip.css";

export function Tooltip({ blip }: { blip: Blip }) {
  return (
    <div className={`tooltip`}>
      <div className={`tooltip-title`}>
        <Icon tooltip blip={blip} />
        <b>{blip.label}</b>
      </div>

      <div className={`tooltip-statusWrapper`}>
        <span className={`tooltip-status`}>{blip.status}</span>
      </div>

      <div className={`tooltip-category`}>{blip.category}</div>
    </div>
  );
}
