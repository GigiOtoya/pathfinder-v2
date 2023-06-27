import { Color, colors } from "./Colors";
import Vertex from "./Vertex";

class Edge {
    u: Vertex;
    v: Vertex;
    w?: number;
    directed: boolean;
    strokeColor: Color = colors.WHITE;
    strokeWidth: number = 3;
    lineDash: number[] = [];

    constructor(u: Vertex, v: Vertex, w: number, directed = false) {
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

export default Edge;