import { MinHeap } from "../utils/MinHeap";
import { Graph, Vertex } from "../utils/graphUtils";

const prim = (graph: Graph, start: Vertex) => {
  const visited = new Set<Vertex>();
  const q = new MinHeap();
  const prev = new Map<Vertex, { p: Vertex | null; w: number }>();
  prev.set(start, { p: null, w: 0 });
  q.heapPush({ val: 0, item: start });

  while (q.minHeap.length) {
    const { item: vertex } = q.heapPop();

    if (visited.has(vertex)) {
      continue;
    }

    //draw logic

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        q.heapPush({ val: edge.w!, item: neighbor });
        if (!prev.has(vertex)) {
          prev.set(vertex, { p: neighbor, w: edge.w! });
        } else if (edge.w! < prev.get(neighbor)!.w) {
          prev.set(neighbor, { p: vertex, w: edge.w! });
        }
      }
    }
    visited.add(vertex);
  }
};
