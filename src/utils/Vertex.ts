import { Color, colors } from "./Colors";

class Vertex {
    x: number;
    y: number;
    r: number;
    name?: string;
    fillColor: Color = colors.GREY;
    strokeColor: Color = colors.WHITE;
    strokeWidth: number = 2;
    lineDash: number[] = [];

    constructor(x: number, y: number, r: number, name?: string) {
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

export default Vertex;