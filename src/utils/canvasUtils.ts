import { Vertex, Edge } from "./graphUtils";
import { colors } from "./Colors";
import { getMidpoint } from "./mathUtils";

// const DOTTED: number[] = [10,10];
// const STRAIGHT: number[] = [];

type CanvasContext = CanvasRenderingContext2D;

export function drawVertex(ctx: CanvasContext, vertex: Vertex | Vertex[]) {
  const vertices = Array.isArray(vertex) ? vertex : [vertex];

  for (const vertex of vertices) {
    ctx.beginPath();
    ctx.setLineDash(vertex.lineDash);
    ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
    ctx.fillStyle = vertex.fillColor;
    ctx.strokeStyle = vertex.strokeColor;
    ctx.lineWidth = vertex.strokeWidth;
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
}

export function drawEdge(ctx: CanvasContext, edge: Edge | Edge[]) {
  const edges = Array.isArray(edge) ? edge : [edge];

  for (const edge of edges) {
    ctx.beginPath();
    ctx.moveTo(edge.u.x, edge.u.y);
    ctx.lineTo(edge.v.x, edge.v.y);

    ctx.setLineDash(edge.lineDash);
    ctx.lineWidth = edge.strokeWidth;
    ctx.strokeStyle = edge.strokeColor;
    ctx.stroke();
  }
}

export function annotateEdge(ctx: CanvasContext, edge: Edge) {
  const midPoint = getMidpoint(edge.u, edge.v);
  const dx = edge.v.x - edge.u.x;
  const dy = edge.v.y - edge.u.y;

  ctx.fillStyle = colors.CYAN;
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  ctx.font = "16px sans-serif";

  ctx.save();
  // get angle to where midpoint would be if translated.
  let angle = Math.atan2(dy, dx);
  // fix text orientation
  if (angle < -Math.PI / 2 || angle > Math.PI / 2) {
    angle -= Math.PI;
  }

  ctx.translate(midPoint.x, midPoint.y);
  ctx.rotate(angle);
  ctx.fillText(`w = ${edge.w}`, 0, 0);
  ctx.restore();
}

export function drawCanvas(ctx: CanvasContext, vertices: Vertex[], edges: Edge[]) {
  clearCanvas(ctx);
  drawVertex(ctx, vertices);
  drawEdge(ctx, edges);
}

export function clearCanvas(ctx: CanvasContext) {
  const canvas = ctx.canvas;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = colors.DARK_PASTEL;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// ============================================================================

// type DrawOptions = {
//     vertex: Vertex | Vertex[],
//     fillColor: Color,
//     strokeColor: Color,
//     strokeWidth: number,
//     lineDash: number[]
// }

// type edgeOptions = {
//     edge: Edge | Edge[],
//     strokeColor: Color,
//     strokeWidth: number,
//     lineDash: number[]
// }

// export function drawVertex(ctx: CanvasContext, options: DrawOptions) {
//     const {
//         vertex,
//         fillColor = colors.GREY,
//         strokeColor = colors.WHITE,
//         strokeWidth = 3,
//         lineDash = STRAIGHT
//     } = options;

//     const vertices = Array.isArray(vertex)? vertex : [vertex];
//     for (const vertex of vertices) {
//         ctx.beginPath();
//         ctx.setLineDash(lineDash);
//         ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI*2);
//         ctx.fillStyle = fillColor
//         ctx.strokeStyle = strokeColor;
//         ctx.lineWidth = strokeWidth
//         ctx.fill();
//         ctx.stroke();

//         if (vertex.name) {
//             ctx.fillStyle = colors.WHITE;
//             ctx.textBaseline = "middle";
//             ctx.textAlign = "center";
//             ctx.font = "bold 20px sans-serif";
//             ctx.fillText(vertex.name, vertex.x, vertex.y);
//         }
//     }
// }

// export function drawEdge(ctx: CanvasContext, options: edgeOptions) {
//     const {
//         edge,
//         strokeColor = colors.WHITE,
//         strokeWidth = 2,
//         lineDash = STRAIGHT
//     } = options;

//     const edges = Array.isArray(edge)? edge : [edge];
//     for (const edge of edges) {
//         ctx.beginPath();
//         ctx.moveTo(edge.u.x, edge.u.y);
//         ctx.lineTo(edge.v.x, edge.v.y);

//         ctx.setLineDash(lineDash);
//         ctx.lineWidth = strokeWidth;
//         ctx.strokeStyle = strokeColor;
//         ctx.stroke();
//     }
// }
