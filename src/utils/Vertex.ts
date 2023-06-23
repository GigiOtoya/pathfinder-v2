class Vertex {
    x: number;
    y: number;
    r: number;
    name?: string

    constructor(x: number, y: number, r: number, name?: string) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.name = name;
    }
}

export default Vertex;