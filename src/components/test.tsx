import { useRef, useEffect } from 'react';
import Vertex from '../utils/Vertex';
import Edge from '../utils/Edge';
import Graph from '../utils/Graph';
import { drawVertex, drawEdge, drawCanvas } from '../utils/canvasUtils';
import './Canvas.css';
import { GraphSVG } from './GraphSVG';

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        function resize(canvas: HTMLCanvasElement) {
            const canvasContainer = canvas?.parentElement;
            if (canvasContainer) {
                canvas.width = canvasContainer.clientWidth;
                canvas.height = canvasContainer.clientHeight;
            }
        }
        resize(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#1b1b1b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const v1 = new Vertex(canvas.width / 2, canvas.height / 2, 20, "A");
        const v2 = new Vertex(canvas.width / 2 - 200, canvas.height / 2 - 75, 20, "B");
        const v3 = new Vertex(canvas.width / 2 + 30, canvas.height / 2 - 150, 20, "C");
        const v4 = new Vertex(canvas.width / 2 + 150, canvas.height / 2 - 20, 20, "D");
        const v5 = new Vertex(canvas.width / 2 - 125, canvas.height / 2 + 100, 20, "E");
        const v6 = new Vertex(canvas.width / 2 + 10, canvas.height / 2 + 150, 20, "F");

        const vertices = [v1,v2,v3,v4,v5,v6];
        drawVertex(ctx, vertices);
    }, []);
    
    const v1 = new Vertex(100, 100, 20, 'A');
    const v2 = new Vertex(140, 100, 20, 'B');
    const v3 = new Vertex(180, 100, 20, 'C');
    const v4 = new Vertex(200, 100, 20, 'D');

    const vertices = [v1,v2,v3,v4];
    
    return (
        <div className='canvas-container' style={{width: "100%", height: "100%"}}>
            {/* <canvas ref={canvasRef}></canvas> */}
            <svg>
                {/* <GraphSVG vertices={ vertices }  /> */}
            </svg>
        </div>
    )
}