import { Edge, Graph, Vertex } from "../utils/graphUtils";
import { MinHeap, heapElement } from "../utils/MinHeap";
import { Visualizer, backtrack, pathType } from "../utils/Visualizer";
import { colors } from "../utils/Colors";
import { ControlPanel } from "../components/ControlPanel";

export const dijkstra = (graph: Graph, start: Vertex, end: Vertex) => {
  const visualizer = new Visualizer();

  const visited = new Set();
  const distances = new Map<Vertex, number>();
  const paths: pathType = new Map();
  const heapQ = new MinHeap();

  for (const vertex of graph.vertices) {
    distances.set(vertex, Infinity);
  }

  distances.set(start, 0);
  paths.set(start, null);
  heapQ.heapPush({ val: 0, item: start });

  while (heapQ.minHeap.length) {
    const { val, item: vertex } = heapQ.heapPop();
    if (!visited.has(vertex)) {
      visited.add(vertex);

      visualizer.addItem({ item: vertex, stroke: colors.AZURE });

      const neighbors = graph.adjacencyList.get(vertex);
      for (const [neighbor, edge] of Array.from(neighbors ?? [])) {
        const nextWeight = val + edge.w!;
        if (!visited.has(neighbor) && nextWeight < distances.get(neighbor)!) {
          distances.set(neighbor, nextWeight);
          paths.set(neighbor, { vertex: vertex, edge: edge });
          heapQ.heapPush({ val: nextWeight, item: neighbor });
          visualizer.addItem({ item: edge, stroke: colors.AZURE });
        }
      }
    }
  }

  const path = backtrack(paths, end);
  const result = visualizer.items.concat(path);

  return result;
};
