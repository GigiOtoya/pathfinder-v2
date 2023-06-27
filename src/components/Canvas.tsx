import { useRef, useEffect } from 'react';
import Vertex from '../utils/Vertex';
import Edge from '../utils/Edge';
import Graph from '../utils/Graph';
import { colors, Color } from '../utils/Colors';
import './Canvas.css';

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

    }, []);
    
    return (
        <div className='canvas-container' style={{width: "100%", height: "100%"}}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}