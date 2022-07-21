export type Cartesian = {
  x: number;
  y: number;
};

export type Polar = {
  r: number;
  t: number;
};

export function polar(cartesian: Cartesian): Polar {
  const { x, y } = cartesian;

  return {
    t: Math.atan2(y, x),
    r: Math.sqrt(x * x + y * y),
  };
}

export function cartesian(polar: Polar): Cartesian {
  return {
    x: polar.r * Math.cos(polar.t),
    y: polar.r * Math.sin(polar.t),
  };
}

function bounded(value: number, min: number, max: number) {
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  return Math.min(Math.max(value, low), high);
}

export function boundedRing(polar: Polar, rMin: number, rMax: number) {
  return {
    t: polar.t,
    r: bounded(polar.r, rMin, rMax),
  };
}

export function boundedBox(point: Cartesian, min: Cartesian, max: Cartesian) {
  return {
    x: bounded(point.x, min.x, max.x),
    y: bounded(point.y, min.y, max.y),
  };
}
