import { Vertex, Edge, Graph } from "./graphUtils";
import { Point, randomInt } from "./mathUtils";

const starter = (center: Point) => {
  const { x, y } = center;
  const g = new Graph();

  g.addVertex(new Vertex(x, y));
  g.addVertex(new Vertex(x - 160, y - 120));
  g.addVertex(new Vertex(x + 30, y - 150));
  g.addVertex(new Vertex(x + 150, y - 20));
  g.addVertex(new Vertex(x - 125, y + 50));
  g.addVertex(new Vertex(x + 10, y + 150));

  g.addEdge(new Edge(g.vertices[0], g.vertices[1]));
  g.addEdge(new Edge(g.vertices[0], g.vertices[3]));
  g.addEdge(new Edge(g.vertices[0], g.vertices[5]));
  g.addEdge(new Edge(g.vertices[1], g.vertices[2]));
  g.addEdge(new Edge(g.vertices[2], g.vertices[4]));
  g.addEdge(new Edge(g.vertices[1], g.vertices[5]));
  g.addEdge(new Edge(g.vertices[2], g.vertices[3]));
  g.addEdge(new Edge(g.vertices[3], g.vertices[5]));

  return g;
};

type coords = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

const random = (n: number, p: number, view: coords) => {
  const g = new Graph();
  const visited = new Set<number>();
  // generate random nodes
  for (let i = 0; i < n; i++) {
    const r = 25;
    const x = randomInt(view.minX + r, view.maxX - r);
    const y = randomInt(view.minY + r, view.maxY - r);
    const name = String.fromCharCode(g.vertices.length + 65);
    g.addVertex(new Vertex(x, y, r, name));
    visited.add(i);
  }
  // make spanning tree
  let u = randomInt(0, visited.size - 1);
  visited.delete(u);
  while (visited.size) {
    const temp = Array.from(visited);
    const v = temp[randomInt(0, temp.length - 1)];
    visited.delete(v);
    g.addEdge(new Edge(g.vertices[u], g.vertices[v]));
    u = v;
  }
  // make more random edges
  for (let i = 0; i < n; i++) {
    const u = g.vertices[i];
    const neighbors = g.adjacencyList.get(u);
    for (let j = 0; j < n; j++) {
      const v = g.vertices[j];
      const makeEdge = Math.random() < p;
      if (i !== j && !neighbors?.has(v) && makeEdge) {
        g.addEdge(new Edge(u, v));
      }
    }
  }
  return g;
};

export { starter, random };
