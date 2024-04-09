import { colors, Color } from "./Colors";
import { Edge, Vertex } from "./graphUtils";

export type visualItem = {
  item: Vertex | Edge | visualItem[];
  stroke?: Color;
  fill?: Color;
};

export type pathType = Map<Vertex, { vertex: Vertex; edge: Edge } | null>;

export const delay = (ms: number): Promise<void> =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export class Visualizer {
  items: visualItem[];

  constructor() {
    this.items = [];
  }

  addItem(visualItem: visualItem) {
    this.items.push(visualItem);
  }
}

export const backtrack = (paths: pathType, end: Vertex) => {
  const visualizer = new Visualizer();
  let vertex: Vertex | null = end;

  while (vertex) {
    visualizer.addItem({ item: vertex, stroke: colors.GREEN });
    const previous = paths.get(vertex);
    if (previous) {
      visualizer.addItem({ item: previous.edge, stroke: colors.GREEN });
      vertex = previous.vertex;
    } else {
      vertex = null;
    }
  }
  return visualizer.items;
};
