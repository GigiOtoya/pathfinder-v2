import { colors } from "../utils/Colors";
import { Graph, Vertex } from "../utils/graphUtils";
import { Visualizer, pathType, backtrack } from "../utils/Visualizer";

export const depthFirstSearchr = (graph: Graph, start: Vertex, end: Vertex) => {
  const visualizer = new Visualizer();
  const visited = new Set();
  const paths: pathType = new Map([[start, null]]);

  const dfs = (vertex: Vertex) => {
    visited.add(vertex);
    //draw logic
    visualizer.addItem({ item: vertex, stroke: colors.AZURE });

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        visualizer.addItem({ item: edge, stroke: colors.AZURE });
        paths.set(neighbor, { vertex: vertex, edge: edge });
        dfs(neighbor);
      }
    }
    return;
  };
  dfs(start);

  const path = backtrack(paths, end);
  const result = visualizer.items.concat(path);
  return result;
};
