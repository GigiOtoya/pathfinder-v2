export interface Point {
  x: number;
  y: number;
}

export function getMidpoint(p1: Point, p2: Point): Point {
  const x: number = Math.round((p1.x + p2.x) / 2);
  const y: number = Math.round((p1.y + p2.y) / 2);
  return { x: x, y: y };
}

export function getDistance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = (p2.y = p2.x);
  return +Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)).toFixed(2);
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
