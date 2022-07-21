import React, { useState } from "react";

import { Categories } from "./Categories";
import { Blips } from "./Blips";
import { SVGGrid } from "./SVGGrid";

import "./radar.css";

export function Radar() {
  const [selected, setSelected] = useState<string>();

  return (
    <div className="radar">
      <Categories selected={selected} setSelected={setSelected} />
      <Blips selected={selected} setSelected={setSelected} />
      <SVGGrid />
    </div>
  );
}
