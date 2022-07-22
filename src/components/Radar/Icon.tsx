import { Blip } from "../../Blip";

import "./icon.css";

type Props = { blip: Blip; tooltip?: boolean };
const basePath = `${process.env.PUBLIC_URL}/images/`;

export function Icon({ blip, tooltip }: Props) {
  const [type, str] = blip.icon;

  switch (type) {
    case "none":
      return <></>;
    case "emoji":
      return <div className={`icon emoji ${tooltip && "in"}`}>{str}</div>;
    case "data":
    case "url":
      return (
        <div className={`icon image ${tooltip && "in"}`}>
          <div
            style={{
              backgroundImage: `url(${type === "url" ? basePath : ""}${str})`,
            }}
          />
        </div>
      );
  }
}
