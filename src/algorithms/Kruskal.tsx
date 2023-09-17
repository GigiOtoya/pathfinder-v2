import { MinHeap, heapElement } from "../utils/MinHeap";
import { Graph, Vertex } from "../utils/graphUtils";
import { Visualizer, visualItem } from "../utils/Visualizer";
import { colors } from "../utils/Colors";
import { ControlPanel } from "../components/ControlPanel";

export const kruskal = (graph: Graph) => {
  const visualizer = new Visualizer();
  const t: number[] = [];
  for (let i = 0; i < graph.vertices.length; i++) {
    t[i] = i;
  }

  const find = (vertex: Vertex): number => {
    let u = vertex.id;
    while (t[u] !== u) {
      u = t[u];
    }
    return u;
  };

  const union = (u: Vertex, v: Vertex) => {
    const x = find(u);
    const y = find(v);
    t[y] = x;
  };

  const arr: heapElement[] = graph.edges.map((edge) => ({ val: edge.w!, item: edge }));
  const q = new MinHeap();
  q.buildMinHeap(arr);
  let cost = 0;

  while (q.minHeap.length) {
    const { val, item: edge } = q.heapPop();
    if (find(edge.u) === find(edge.v)) {
      visualizer.addItem({ item: edge, stroke: colors.RED });
      visualizer.addItem({ item: edge, stroke: colors.WHITE });
      continue;
    }
    cost += val;
    union(edge.u, edge.v);
    visualizer.addItem({ item: edge, stroke: colors.AZURE });
    const item1: visualItem = { item: edge.u, stroke: colors.GREEN };
    const item2: visualItem = { item: edge.v, stroke: colors.GREEN };
    const item3: visualItem = { item: edge, stroke: colors.GREEN };
    visualizer.addItem({ item: [item1, item2, item3] });
  }
  return visualizer.items;
};
