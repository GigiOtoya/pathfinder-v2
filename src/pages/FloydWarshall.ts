import { Graph } from "../utils/graphUtils";

export const floydWarshall = (graph: Graph) => {
  const distances: number[][] = [];
  const prev: (number | null)[][] = [];

  for (let i = 0; i < graph.vertices.length; i++) {
    distances[i] = [];
    prev[i] = [];
    for (let j = 0; j < graph.vertices.length; j++) {
      distances[i][j] = i === j ? 0 : Infinity;
      prev[i][j] = i === j ? i : null;
    }
  }

  for (const edge of graph.edges) {
    const u = edge.u.id;
    const v = edge.v.id;
    distances[u][v] = edge.w!;
    prev[u][v] = u;
  }

  for (let k = 0; k < graph.vertices.length; k++) {
    // draw logic

    for (let i = 0; i < graph.vertices.length; i++) {
      if (i === k) {
        continue;
      }
      for (let j = 0; j < graph.vertices.length; j++) {
        if (i === j || j === k) {
          continue;
        }

        // draw logic
        if (distances[i][j] > distances[i][k] + distances[k][j]) {
          distances[i][j] = distances[i][k] + distances[k][j];
          prev[i][j] = prev[k][j];

          // draw logic
        }
        // draw logic
      }
    }
  }
};
