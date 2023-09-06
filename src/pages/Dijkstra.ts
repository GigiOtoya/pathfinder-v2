import { Graph, Vertex } from "../utils/graphUtils";
import { MinHeap, heapElement } from "../utils/MinHeap";

const dijkstra = (graph: Graph, start: Vertex, end: Vertex) => {
  const visited = new Set();
  const distances = new Map<Vertex, number>();
  const paths = new Map<Vertex, Vertex | null>();
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

      const neighbors = graph.adjacencyList.get(vertex);
      for (const [neighbor, edge] of Array.from(neighbors ?? [])) {
        const nextWeight = val + edge.w!;
        if (!visited.has(neighbor) && nextWeight < distances.get(neighbor)!) {
          distances.set(neighbor, nextWeight);
          paths.set(neighbor, vertex);
          heapQ.heapPush({ val: nextWeight, item: neighbor });
        }
      }
    }
  }
};
