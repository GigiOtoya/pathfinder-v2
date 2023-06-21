import Vertex from "./Vertex";
import Edge from "./Edge";

class Graph {
    vertices: Vertex[];
    edges: Edge[];
    adjacencyList: Map<Vertex, Vertex[]>;

    constructor() {
        this.vertices = [];
        this.edges = [];
        this.adjacencyList = new Map();
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

export default Graph;