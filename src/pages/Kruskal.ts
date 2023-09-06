import { MinHeap, heapElement } from "../utils/MinHeap";
import { Graph, Vertex } from "../utils/graphUtils";

export const kruskal = (graph: Graph) => {
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
      //draw logic
    }
    cost += val;
    union(edge.u, edge.v);
    //draw logic
  }
};
