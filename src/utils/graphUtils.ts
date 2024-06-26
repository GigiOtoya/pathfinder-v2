import { Color, colors } from "./Colors";
import { randomInt } from "./mathUtils";

class Graph {
  vertices: Vertex[];
  edges: Edge[];
  adjacencyList: Map<Vertex, Map<Vertex, Edge>>;
  weighted: boolean;
  directed: boolean;
  nextVertexId: number;
  nextEdgeId: number;
  reset: boolean;

  constructor(graph?: Graph, weighted = true, directed = false, reset = false) {
    this.vertices = [];
    this.edges = [];
    this.adjacencyList = new Map<Vertex, Map<Vertex, Edge>>();
    this.weighted = weighted;
    this.directed = directed;
    this.nextVertexId = this.vertices.length;
    this.nextEdgeId = this.edges.length;
    this.reset = reset;

    if (graph) {
      const vertexMap = new Map<number, Vertex>();
      graph.vertices.forEach((v) => {
        const vertexCopy = new Vertex(v.x, v.y, v.r, v.name);
        if (!reset) {
          vertexCopy.setDrawingProperties(v.fillColor, v.strokeColor, v.strokeWidth, v.lineDash);
        }
        this.addVertex(vertexCopy);
        vertexMap.set(v.id, vertexCopy);
      });

      graph.edges.forEach((edge) => {
        const u = vertexMap.get(edge.u.id);
        const v = vertexMap.get(edge.v.id);
        if (u && v) {
          const edgeCopy = new Edge(u, v, edge.w);
          if (!reset) {
            edgeCopy.setDrawingProperties(edge.strokeColor, edge.strokeWidth, edge.lineDash);
          }
          this.addEdge(edgeCopy);
        }
      });
    }
  }
  addVertex(vertex: Vertex) {
    if (!this.adjacencyList.has(vertex)) {
      vertex.setId(this.nextVertexId++);
      vertex.setName(String.fromCharCode(vertex.id + 65));
      this.vertices.push(vertex);
      this.adjacencyList.set(vertex, new Map<Vertex, Edge>());
    }
  }

  addEdge(edge: Edge) {
    if (this.hasEdge(edge.u, edge.v) || edge.u === edge.v) {
      return;
    }

    if (this.weighted) {
      const weight = edge.w ? edge.w : randomInt(1, 10);
      edge.setEdgeWeight(weight);
    } else {
      edge.setEdgeWeight(0);
    }

    const uMap = this.adjacencyList.get(edge.u);
    const vMap = this.adjacencyList.get(edge.v);
    if (uMap) {
      uMap.set(edge.v, edge);
    }

    if (!this.directed && vMap) {
      vMap.set(edge.u, edge);
    }
    edge.setId(this.nextEdgeId++);
    this.edges.push(edge);
  }

  hasEdge(u: Vertex, v: Vertex): boolean {
    if (!this.adjacencyList.has(u) || !this.adjacencyList.has(v)) {
      return false;
    }
    return this.adjacencyList.get(u)!.has(v);
  }

  getEdge(u: Vertex, v: Vertex): Edge | null {
    if (this.hasEdge(u, v)) {
      const edge = this.adjacencyList.get(u)!.get(v);
      return edge!;
    }
    return null;
  }

  randomizeWeights() {
    if (this.weighted) {
      this.edges.forEach((edge) => edge.setEdgeWeight(randomInt(1, 10)));
    }
  }
}

class Edge {
  u: Vertex;
  v: Vertex;
  w?: number;
  id: number;
  strokeColor: Color = colors.WHITE;
  strokeWidth: number = 3;
  lineDash: number[] = [];

  constructor(u: Vertex, v: Vertex, w?: number) {
    this.u = u;
    this.v = v;
    this.w = w;
    this.id = 0;
  }

  setId(id: number) {
    this.id = id;
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
  strokeWidth: number = 4;
  lineDash: number[] = [];

  constructor(x: number, y: number, r: number = 25, name?: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = name;
    this.id = 0;
  }

  setId(id: number) {
    this.id = id;
  }

  setName(name: string) {
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
