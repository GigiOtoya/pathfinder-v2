import { Graph, Vertex } from "../utils/graphUtils";

const depthFirstSearchi = (graph: Graph, start: Vertex, end: Vertex) => {
  const stack: Vertex[] = [start];
  const visited = new Set([start]);
  const paths = new Map<Vertex, Vertex | null>([[start, null]]);

  while (stack.length) {
    const vertex = stack.pop()!;

    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        visited.add(neighbor);
        paths.set(neighbor, vertex);
      }
    }
  }
};
