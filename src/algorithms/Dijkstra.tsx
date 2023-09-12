import { Edge, Graph, Vertex } from "../utils/graphUtils";
import { MinHeap, heapElement } from "../utils/MinHeap";
import { Visualizer, backtrack, pathType } from "../utils/Visualizer";
import { colors } from "../utils/Colors";

export const dijkstra = (graph: Graph, start: Vertex, end: Vertex) => {
  const visualizer = new Visualizer();

  const visited = new Set();
  const distances = new Map<Vertex, number>();
  // const paths = new Map<Vertex, Vertex | null>();
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

      //draw logic
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

  // let destination: Vertex | null | undefined = end;
  // while (destination) {
  //   visualizer.addItem({ item: destination, stroke: colors.GREEN });
  //   const previous = paths.get(destination);
  //   if (previous) {
  //     const edge = graph.getEdge(destination, previous)!;
  //     visualizer.addItem({ item: edge, stroke: colors.GREEN });
  //   }
  //   destination = previous;

  //   // if (paths.has(end)) {
  //   //   console.log(end);
  //   //   visualizer.addItem({ item: end, stroke: colors.GREEN });
  //   //   const previous = paths.get(end)!;
  //   //   if (previous !== null) {
  //   //     const edge = graph.getEdge(end, previous)!;
  //   //     visualizer.addItem({ item: edge, stroke: colors.GREEN });
  //   //   }
  //   //   end = previous;
  //   // }
  // }
  return result;
};

// type pathType = Record<number, { vertexId: number; edgeId: number } | null>;

// const backTrack = (paths: pathType, vertexId: number | null) => {
//   const visualizer = new Visualizer();
//   while (vertexId) {
//     const previous = paths[vertexId];
//     if (previous) {
//       visualizer.addItem({item: previous.vertexId});
//     }
//   }
// };
