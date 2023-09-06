import { Graph, Vertex } from "../utils/graphUtils";

const depthFirstSearchr = (graph: Graph, start: Vertex, end: Vertex) => {
  const visited = new Set();
  const paths = new Map<Vertex, Vertex | null>([[start, null]]);

  const dfs = (vertex: Vertex) => {
    visited.add(vertex);

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        paths.set(neighbor, vertex);
        dfs(neighbor);
      }
    }
    return;
  };
  dfs(start);
};
