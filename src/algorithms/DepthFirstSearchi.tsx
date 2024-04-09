import { ControlPanel } from "../components/ControlPanel";
import { colors } from "../utils/Colors";
import { Visualizer, pathType, backtrack } from "../utils/Visualizer";
import { Graph, Vertex } from "../utils/graphUtils";

export const depthFirstSearchi = (graph: Graph, start: Vertex, end: Vertex) => {
  const visualizer = new Visualizer();

  const stack: Vertex[] = [start];
  const visited = new Set([start]);
  const paths: pathType = new Map([[start, null]]);

  while (stack.length) {
    const vertex = stack.pop()!;
    visualizer.addItem({ item: vertex, stroke: colors.AZURE });

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
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
