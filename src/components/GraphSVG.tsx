import Graph from "../utils/Graph";
import Vertex from "../utils/Vertex";
import { useRef, useState } from "react";
import './GraphSVG.css';
import { transform } from "typescript";

export const GraphSVG = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    const [groupRef, setGroupRef] = useState<SVGGElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [vertices, setVertices] = useState<Vertex[]>(() => {
        const v1 = new Vertex(200, 200, 25, 'A');
        const v2 = new Vertex(300, 300, 25, 'B');
        return [v1, v2];
    })

    const handleMouseMove = (e : React.MouseEvent) => {
        if (groupRef&& svgRef.current && isDragging) {
            const { clientX, clientY } = e;
            const { left, top } = svgRef.current.getBoundingClientRect();
            const x = clientX - left;
            const y = clientY - top;
            
            // update position
            groupRef.setAttribute('transform', `translate(${x},${y})`);
        }
    }

    const handleMouseDown = (e : React.MouseEvent, name?: string) => {
        setIsDragging(true);
        const group = e.currentTarget.parentElement;
        if (group instanceof SVGGElement){
            setGroupRef(group);
        }
        //     setVertices(prevVertices => {
        //         const vertices = [...prevVertices];
        //         if (name) {
        //             const index = name.charCodeAt(0) - 65;
        //             vertices[index].x = x;
        //             vertices[index].y = y;
        //         }
        //         return vertices;
        //     })
            
        // }
    }

    const handleMouseUp = (e : React.MouseEvent) => {
        setIsDragging(false);
    }

    return (
        <svg 
            ref={ svgRef } 
            onMouseMove={ handleMouseMove }
            onMouseUp={ handleMouseUp}
            >
            {vertices.map( vertex => (
                <g 
                    key={ vertex.name } 
                    id= {vertex.name} 
                    transform={`translate(${vertex.x}, ${vertex.y})`}
                    >
                    <circle
                        cx={ 0 }
                        cy={ 0 }
                        r={ vertex.r }
                        fill={ vertex.fillColor }
                        stroke={ vertex.strokeColor }
                        strokeWidth={ vertex.strokeWidth }
                        strokeDasharray={ vertex.lineDash.join(" ")}
                        onMouseDown={ e => handleMouseDown(e, vertex.name) }
                    />
                    <text 
                        x={ 0 } 
                        y={ 0 } 
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style = {{fill: vertex.strokeColor}}
                        >
                        { vertex.name }
                    </text>
                </g>
            ))}
        </svg>
    )
}