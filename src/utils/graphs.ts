import { Vertex, Edge, Graph } from "./graphUtils";
import { Point, randomInt } from "./mathUtils";

const starter = (center: Point) => {
  const { x, y } = center;
  const g = new Graph();

  g.addVertex(new Vertex(x, y, 25, "A"));
  g.addVertex(new Vertex(x - 160, y - 120, 25, "B"));
  g.addVertex(new Vertex(x + 30, y - 150, 25, "C"));
  g.addVertex(new Vertex(x + 150, y - 20, 25, "D"));
  g.addVertex(new Vertex(x - 125, y + 50, 25, "E"));
  g.addVertex(new Vertex(x + 10, y + 150, 25, "F"));

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

type viewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const random = (n: number, p: number, viewBox: viewBox) => {
  const g = new Graph();
  const visited = new Set<number>();

  for (let i = 0; i < n; i++) {
    const x = randomInt(viewBox.x, viewBox.width);
    const y = randomInt(viewBox.y, viewBox.height);
    const name = String.fromCharCode(g.vertices.length + 65);
    g.addVertex(new Vertex(x, y, 25, name));
    visited.add(i);
  }

  let u = randomInt(0, Array.from(visited).length - 1);
  visited.delete(u);
  while (visited.size) {
    const temp = Array.from(visited);
    const v = temp[randomInt(0, temp.length - 1)];
    visited.delete(v);
    g.addEdge(new Edge(g.vertices[u], g.vertices[v]));
    u = v;
    console.log(visited);
  }

  return g;
};

export { starter, random };
