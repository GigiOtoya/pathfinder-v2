import { MinHeap } from "../utils/MinHeap";
import { Graph, Vertex } from "../utils/graphUtils";
import { Visualizer, pathType } from "../utils/Visualizer";
import { colors } from "../utils/Colors";
import { ControlPanel } from "../components/ControlPanel";

export const prim = (graph: Graph, start: Vertex) => {
  const visualizer = new Visualizer();
  const visited = new Set<Vertex>();
  const q = new MinHeap();
  const prev: pathType = new Map([[start, null]]);
  q.heapPush({ val: 0, item: start });

  while (q.minHeap.length) {
    const { item: vertex } = q.heapPop();

    if (visited.has(vertex)) {
      continue;
    }

    visualizer.addItem({ item: vertex, stroke: colors.GREEN });
    const edge = prev.get(vertex)?.edge;
    if (edge) {
      visualizer.addItem({ item: edge, stroke: colors.GREEN });
    }

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        q.heapPush({ val: edge.w!, item: neighbor });
        if (!prev.has(neighbor)) {
          prev.set(neighbor, { vertex: vertex, edge: edge });
        } else if (edge.w! < prev.get(neighbor)!.edge.w!) {
          prev.set(neighbor, { vertex: vertex, edge: edge });
        }
      }
    }
    visited.add(vertex);
  }

  return visualizer.items;
};
