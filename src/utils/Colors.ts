type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

type Colors = {
    DARK_PASTEL: Color,
    CYAN: Color,
    AZURE: Color,
    WHITE: Color,
    GREY: Color,
    GREEN: Color
}

export const colors: Colors = {
    DARK_PASTEL: "#1b1b1b",
    CYAN: "#00FEFE",
    AZURE: "#336DFF",
    WHITE: "#FFFFFF",
    GREY: "#3c4043",
    GREEN: "#00FF00"
} as const;

export type Line = {
    STRAIGHT: number[],
    DASHED: number[]
}

export const lines: Line = {
    STRAIGHT: [],
    DASHED: [10, 10]
}