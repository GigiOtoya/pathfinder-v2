import { Vertex, Edge, Graph } from "./graphUtils";

const defaultGraph = new Graph();
defaultGraph.addVertex(new Vertex(200, 200, 25, "A"));
defaultGraph.addVertex(new Vertex(300, 300, 25, "B"));
defaultGraph.addVertex(new Vertex(400, 500, 25, "C"));
defaultGraph.addEdge(
  new Edge(defaultGraph.vertices[0], defaultGraph.vertices[1], 10)
);
defaultGraph.addEdge(
  new Edge(defaultGraph.vertices[1], defaultGraph.vertices[2], 5)
);
export { defaultGraph };
