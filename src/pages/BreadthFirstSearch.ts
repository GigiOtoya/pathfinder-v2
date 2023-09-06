import { Graph, Vertex } from "../utils/graphUtils";

const breadthFirstSearch = (graph: Graph, start: Vertex, end: Vertex) => {
  const Q: Vertex[] = [start];
  const visited = new Set<Vertex>([start]);
  const paths = new Map<Vertex, Vertex | null>([[start, null]]);

  while (Q.length) {
    const vertex = Q.shift()!;

    //draw logic
    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      if (!visited.has(neighbor)) {
        Q.push(neighbor);
        visited.add(neighbor);
        paths.set(neighbor, vertex);
        //draw logic
      }
    }
  }
};
