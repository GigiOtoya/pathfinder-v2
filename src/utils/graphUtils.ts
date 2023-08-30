import { Color, colors } from "./Colors";

class Graph {
  vertices: Vertex[];
  edges: Edge[];
  adjacencyList: Map<Vertex, Map<Vertex, Edge>>;
  directed: boolean;
  nextVertexId: number;

  constructor(graph?: Graph, directed = false) {
    this.vertices = [];
    this.edges = [];
    this.adjacencyList = new Map();
    this.directed = directed;
    this.nextVertexId = this.vertices.length;

    if (graph) {
      // Mapping to dereference old vertices
      const vertexMap = new Map<number, Vertex>();
      graph.vertices.forEach((v) => {
        const vertexCopy = new Vertex(v.x, v.y, v.r, v.name);
        vertexCopy.setDrawingProperties(v.fillColor, v.strokeColor, v.strokeWidth, v.lineDash);
        this.addVertex(vertexCopy);
        vertexMap.set(v.id, vertexCopy); // maybe this?
      });

      graph.edges.forEach((edge) => {
        // reference new vertices
        const u = vertexMap.get(edge.u.id); // copy of u
        const v = vertexMap.get(edge.v.id); // copy of v
        if (u && v) {
          const edgeCopy = new Edge(u, v, edge.w);
          edgeCopy.setDrawingProperties(edge.strokeColor, edge.strokeWidth, edge.lineDash);
          this.addEdge(edgeCopy);
        }
      });
    }
  }

  addVertex(vertex: Vertex) {
    if (!this.adjacencyList.has(vertex)) {
      vertex.setId(this.nextVertexId++);
      this.vertices.push(vertex);
      this.adjacencyList.set(vertex, new Map<Vertex, Edge>());
    }
  }

  addEdge(edge: Edge) {
    if (this.hasEdge(edge.u, edge.v) || edge.u === edge.v) {
      return;
    }

    const uMap = this.adjacencyList.get(edge.u);
    const vMap = this.adjacencyList.get(edge.v);
    if (uMap) {
      uMap.set(edge.v, edge);
    }

    if (!this.directed && vMap) {
      vMap.set(edge.u, edge);
    }

    this.edges.push(edge);
  }

  hasEdge(u: Vertex, v: Vertex): boolean {
    if (!this.adjacencyList.has(u) || !this.adjacencyList.has(v)) {
      return false;
    }
    return this.adjacencyList.get(u)!.has(v);
  }
}

class Edge {
  u: Vertex;
  v: Vertex;
  w?: number;
  strokeColor: Color = colors.WHITE;
  strokeWidth: number = 3;
  lineDash: number[] = [];

  constructor(u: Vertex, v: Vertex, w?: number) {
    this.u = u;
    this.v = v;
    this.w = w;
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

  setDrawingProperties(strokeColor: Color, strokeWidth: number, lineDash: number[]) {
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
  id: number;
  fillColor: Color = colors.GREY;
  strokeColor: Color = colors.WHITE;
  strokeWidth: number = 3;
  lineDash: number[] = [];

  constructor(x: number, y: number, r: number = 20, name?: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = name;
    this.id = 0;
  }

  setId(id: number) {
    this.id = id;
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
