import { Color, colors } from "./Colors";

class Graph {
  vertices: Vertex[];
  edges: Edge[];
  adjacencyList: Map<Vertex, Vertex[]>;

  constructor(graph?: Graph) {
    this.vertices = [];
    this.edges = [];
    this.adjacencyList = new Map();

    if (graph) {
      // Mapping to dereference old vertices
      const vertexMap = new Map<Vertex, Vertex>();
      graph.vertices.forEach((v) => {
        const vertexCopy = new Vertex(v.x, v.y, v.r, v.name);
        vertexCopy.setDrawingProperties(
          v.fillColor,
          v.strokeColor,
          v.strokeWidth,
          v.lineDash
        );
        this.addVertex(vertexCopy);
        vertexMap.set(v, vertexCopy);
      });

      graph.edges.forEach((edge) => {
        // reference new vertices
        const u = vertexMap.get(edge.u);
        const v = vertexMap.get(edge.v);
        if (u && v) {
          const edgeCopy = new Edge(u, v, edge.w, edge.directed);
          edgeCopy.setDrawingProperties(
            edge.strokeColor,
            edge.strokeWidth,
            edge.lineDash
          );
          this.addEdge(edgeCopy);
        }
      });
    }
  }

  addVertex(vertex: Vertex) {
    this.vertices.push(vertex);
    this.adjacencyList.set(vertex, []);
  }

  addEdge(edge: Edge) {
    this.edges.push(edge);
    this.adjacencyList.get(edge.u)?.push(edge.v);

    if (!edge.directed) {
      this.adjacencyList.get(edge.v)?.push(edge.u);
    }
  }
}

class Edge {
  u: Vertex;
  v: Vertex;
  w?: number;
  directed: boolean;
  strokeColor: Color = colors.WHITE;
  strokeWidth: number = 3;
  lineDash: number[] = [];

  constructor(u: Vertex, v: Vertex, w?: number, directed = false) {
    this.u = u;
    this.v = v;
    this.w = w;
    this.directed = directed;
  }

  setEdgeWeight(weight: number) {
    this.w = weight;
  }

  setStrokeColor(color: Color) {
    this.strokeColor = color;
  }

  setStrokeWidth(width: number) {
    this.strokeWidth = width;
  }

  setLineDash(style: number[]) {
    this.lineDash = style;
  }

  setDrawingProperties(
    strokeColor: Color,
    strokeWidth: number,
    lineDash: number[]
  ) {
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
    this.lineDash = lineDash;
  }
}

class Vertex {
  x: number;
  y: number;
  r: number;
  name?: string;
  fillColor: Color = colors.GREY;
  strokeColor: Color = colors.WHITE;
  strokeWidth: number = 3;
  lineDash: number[] = [];

  constructor(x: number, y: number, r: number = 20, name?: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = name;
  }

  setFillColor(color: Color) {
    this.fillColor = color;
  }

  setStrokeColor(color: Color) {
    this.strokeColor = color;
  }

  setStrokeWidth(width: number) {
    this.strokeWidth = width;
  }

  setLineDash(style: number[]) {
    this.lineDash = style;
  }
  setDrawingProperties(
    fillColor: Color,
    strokeColor: Color,
    strokeWidth: number,
    lineDash: number[]
  ) {
    this.setFillColor(fillColor);
    this.setStrokeColor(strokeColor);
    this.setStrokeWidth(strokeWidth);
    this.setLineDash(lineDash);
  }
}

export { Graph, Vertex, Edge };
