import { Entry, Category, status, categories } from "./types";
import { rings } from "./constants";
import {
  Polar,
  Cartesian,
  polar,
  cartesian,
  boundedBox,
  boundedRing,
} from "./math";

const margin = 20;

export class Blip {
  polarMin: Polar;
  polarMax: Polar;
  cartesianMin: Cartesian;
  cartesianMax: Cartesian;
  x: number = 0;
  y: number = 0;

  constructor(public entry: Entry) {
    const quadrant = categories.indexOf(entry.category);
    const ring = status.indexOf(entry.status);

    this.polarMin = {
      t: quadrants[quadrant].radialMin * Math.PI,
      r: ring === 0 ? 30 : rings[ring - 1].radius,
    };
    this.polarMax = {
      t: quadrants[quadrant].radialMax * Math.PI,
      r: rings[ring].radius,
    };
    this.cartesianMin = {
      x: margin * quadrants[quadrant].factorX,
      y: margin * quadrants[quadrant].factorY,
    };
    this.cartesianMax = {
      x: rings[3].radius * quadrants[quadrant].factorX,
      y: rings[3].radius * quadrants[quadrant].factorY,
    };

    const init = cartesian({
      t: randomBetween(this.polarMin.t, this.polarMax.t),
      r: normalBetween(this.polarMin.r, this.polarMax.r),
    });

    this.position(init);
    this.clip();
  }

  position(point: Cartesian) {
    this.x = point.x;
    this.y = point.y;
  }

  translate() {
    return `translate(${this.x}px, ${this.y}px)`;
  }

  update(d: d3.SimulationNodeDatum) {
    this.clip();
    return this;
  }

  clip() {
    const box = boundedBox(this, this.cartesianMin, this.cartesianMax);
    const point = boundedRing(
      polar(box),
      this.polarMin.r + margin,
      this.polarMax.r - margin
    );

    this.position(cartesian(point));
  }

  get label(): Entry["label"] {
    return this.entry.label;
  }

  get originId(): Entry["originId"] {
    return this.entry.originId;
  }

  isSelected(selected?: string) {
    return this.originId === selected;
  }

  get id(): Entry["id"] {
    return this.entry.id;
  }

  get icon(): Entry["icon"] {
    return this.entry.icon;
  }

  get status(): Entry["status"] {
    return this.entry.status;
  }

  get category(): Entry["category"] {
    return this.entry.category;
  }
}

// Plato's number
let seed = 5040;

function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function randomBetween(min: number, max: number) {
  return min + random() * (max - min);
}

function normalBetween(min: number, max: number) {
  return min + (random() + random()) * 0.5 * (max - min);
}

export const quadrants = [
  { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 },
  { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 },
  { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 },
  { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
];
