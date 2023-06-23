import Vertex from "./Vertex";
import { Color, colors } from "./Colors";

type DrawOptions = {
    vertex: Vertex,
    fillColor: Color,
    strokeColor: Color,
    strokeWidth: number,
    lineDash: number[]
}
const DOTTED: number[] = [10,10];
const STRAIGHT: number[] = [];

export function drawVertex(ctx: CanvasRenderingContext2D, options: DrawOptions) {

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
