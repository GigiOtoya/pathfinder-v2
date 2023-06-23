import { useRef, useEffect } from 'react';
import Vertex from '../utils/Vertex';
import Edge from '../utils/Edge';
import Graph from '../utils/Graph';
import './Canvas.css';

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContainer = canvas?.parentElement;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        if (canvasContainer) {
            const { width, height } = canvasContainer?.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
        }

        if (!ctx) {
            return;
        }

        ctx.fillStyle = '#1b1b1b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }, []);
    
    return (
        <div className='canvas-container' style={{width: "100%", height: "100%"}}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}