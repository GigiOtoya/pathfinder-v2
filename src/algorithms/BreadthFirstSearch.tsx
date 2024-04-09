import { ControlPanel } from "../components/ControlPanel";
import { colors } from "../utils/Colors";
import { Graph, Vertex } from "../utils/graphUtils";
import { Visualizer, pathType, backtrack } from "../utils/Visualizer";

export const breadthFirstSearch = (graph: Graph, start: Vertex, end: Vertex) => {
  const visualizer = new Visualizer();
  const Q: Vertex[] = [start];
  const visited = new Set<Vertex>([start]);
  const paths: pathType = new Map([[start, null]]);

  while (Q.length) {
    const vertex = Q.shift()!;
    visualizer.addItem({ item: vertex, stroke: colors.AZURE });

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        Q.push(neighbor);
        visited.add(neighbor);
        paths.set(neighbor, { vertex: vertex, edge: edge });
        visualizer.addItem({ item: edge, stroke: colors.AZURE });
      }
    }
  }

  const path = backtrack(paths, end);
  const result = visualizer.items.concat(path);
  return result;
};
