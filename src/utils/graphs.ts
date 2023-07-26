import { Vertex, Edge, Graph } from "./graphUtils";
import { Point } from "./mathUtils";

const defaultGraph = (center: Point) => {
  const { x, y } = center;
  const g = new Graph();

  g.addVertex(new Vertex(x, y, 25, "A"));
  g.addVertex(new Vertex(x - 160, y - 120, 25, "B"));
  g.addVertex(new Vertex(x + 30, y - 150, 25, "C"));
  g.addVertex(new Vertex(x + 150, y - 20, 25, "D"));
  g.addVertex(new Vertex(x - 125, y + 100, 25, "E"));
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
export { defaultGraph };
