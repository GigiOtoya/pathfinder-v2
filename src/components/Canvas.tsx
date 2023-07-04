import Vertex from '../utils/Vertex';
import Edge from '../utils/Edge';
import Graph from '../utils/Graph';
import './Canvas.css';
import { GraphSVG } from './GraphSVG';
export const SVG = () => {
    
    const v1 = new Vertex(100, 100, 20, 'A');
    const v2 = new Vertex(140, 100, 20, 'B');
    const v3 = new Vertex(180, 100, 20, 'C');
    const v4 = new Vertex(200, 100, 20, 'D');

    const vertices = [v1,v2,v3,v4];

    const handleMouseMove = (e: React.MouseEvent) => {
        console.log(e.clientX, e.clientY);
    }

    return (
    <div className='canvas-container' style={{width: "100%", height: "100%"}}>
        <svg onMouseMove={ handleMouseMove }>
            {/* <GraphSVG vertices={ vertices }  /> */}
        </svg>
    </div>
    )
}