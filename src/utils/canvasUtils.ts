import Vertex from "./Vertex";
import Edge from "./Edge";
import { Color, colors } from "./Colors";

const DOTTED: number[] = [10,10];
const STRAIGHT: number[] = [];

type CanvasContext = CanvasRenderingContext2D;

type DrawOptions = {
    vertex: Vertex,
    fillColor: Color,
    strokeColor: Color,
    strokeWidth: number,
    lineDash: number[]
}

type edgeOptions = {
    edge: Edge,
    strokeColor: Color,
    strokeWidth: number,
    lineDash: number[]
}

export function drawVertex(ctx: CanvasContext, options: DrawOptions) {
    const { 
        vertex, 
        fillColor = colors.GREY, 
        strokeColor = colors.WHITE, 
        strokeWidth = 3,
        lineDash = STRAIGHT
    } = options;

    ctx.beginPath();
    ctx.setLineDash(lineDash);
    ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI*2);
    ctx.fillStyle = fillColor
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth
    ctx.fill();
    ctx.stroke();

    if (vertex.name) {
        ctx.fillStyle = colors.WHITE;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "bold 20px sans-serif";
        ctx.fillText(vertex.name, vertex.x, vertex.y);
    }
}

export function drawEdge(ctx: CanvasContext, options: edgeOptions) {
    const {
        edge,
        strokeColor = colors.WHITE,
        strokeWidth = 2,
        lineDash = STRAIGHT
    } = options;

    ctx.beginPath();
    ctx.moveTo(edge.u.x, edge.u.y);
    ctx.lineTo(edge.v.x, edge.v.y);

    ctx.setLineDash(lineDash);
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
}