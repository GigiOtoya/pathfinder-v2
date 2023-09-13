import { colors } from "../utils/Colors";
import { Visualizer, visualItem } from "../utils/Visualizer";
import { Graph } from "../utils/graphUtils";

export const floydWarshall = (graph: Graph) => {
  const visualizer = new Visualizer();
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
  for (let vertex of graph.vertices) {
    const neighbors = Array.from(graph.adjacencyList.get(vertex) ?? []);
    for (const [neighbor, edge] of neighbors) {
      const u = vertex.id;
      const v = neighbor.id;
      distances[u][v] = edge.w!;
      prev[u][v] = u;
    }
  }
  // for (const edge of graph.edges) {
  //   const u = edge.u.id;
  //   const v = edge.v.id;
  //   distances[u][v] = edge.w!;
  //   prev[u][v] = u;
  // }

  for (let k = 0; k < graph.vertices.length; k++) {
    // draw logic
    visualizer.addItem({ item: graph.vertices[k], fill: colors.AZURE });

    for (let i = 0; i < graph.vertices.length; i++) {
      if (i === k) {
        continue;
      }

      for (let j = 0; j < graph.vertices.length; j++) {
        if (i === j || j === k) {
          continue;
        }
        // draw logic
        const item2: visualItem = { item: graph.vertices[i], stroke: colors.AZURE };
        const item3: visualItem = { item: graph.vertices[j], stroke: colors.AZURE };
        visualizer.addItem({ item: [item2, item3] });

        if (distances[i][j] > distances[i][k] + distances[k][j]) {
          distances[i][j] = distances[i][k] + distances[k][j];
          prev[i][j] = prev[k][j];
          // draw logic
          trace(prev, graph, i, j, visualizer);
        }
        // draw logic
        const item4: visualItem = { item: graph.vertices[i], stroke: colors.WHITE };
        const item5: visualItem = { item: graph.vertices[j], stroke: colors.WHITE };
        const item6: visualItem = {
          item: graph.vertices[k],
          fill: colors.AZURE,
          stroke: colors.WHITE,
        };
        visualizer.addItem({ item: [item4, item5, item6] });
      }
    }
    visualizer.addItem({ item: graph.vertices[k], stroke: colors.WHITE, fill: colors.GREY });
  }
  return visualizer.items;
};

const trace = (
  prev: (number | null)[][],
  graph: Graph,
  i: number,
  j: number,
  visualizer: Visualizer
) => {
  let u = i;
  let v = j;

  const reset: visualItem[] = [];
  while (u !== v && prev[u][v] !== null) {
    const head = graph.vertices[v];
    const tail = graph.vertices[prev[u][v]!];
    const edge = graph.getEdge(head, tail);
    const item1: visualItem = { item: head, stroke: colors.GREEN };
    const item2: visualItem = { item: tail, stroke: colors.GREEN };
    const item3: visualItem = { item: edge!, stroke: colors.GREEN };
    visualizer.addItem({ item: [item1, item2, item3] });

    const item4: visualItem = { item: head, stroke: colors.WHITE };
    const item5: visualItem = { item: tail, stroke: colors.WHITE };
    const item6: visualItem = { item: edge!, stroke: colors.WHITE };
    reset.push(item4, item5, item6);

    if (v === prev[u][prev[u][v]!]) {
      break;
    } else {
      v = prev[u][v]!;
    }
  }
  visualizer.addItem({ item: reset });
};
