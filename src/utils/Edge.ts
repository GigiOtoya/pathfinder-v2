import Vertex from "./Vertex";

class Edge {
    u: Vertex;
    v: Vertex;
    w: number;
    directed: boolean;

    constructor(u: Vertex, v: Vertex, w: number, directed = false) {
        this.u = u;
        this.v = v;
        this.w = w;
        this.directed = directed;
    }
}

export default Edge;