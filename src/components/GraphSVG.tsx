import Vertex from "../utils/Vertex";
import Edge from "../utils/Edge";
import Graph from "../utils/Graph";
import { useRef, useState } from "react";
import './GraphSVG.css';

export const GraphSVG = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    const [groupRef, setGroupRef] = useState<SVGGElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [currVertex, setVertex] = useState<Vertex | null>(null);
    const [graph, setGraph] = useState<Graph>(() => {
        const g1 = new Graph();
        g1.addVertex(new Vertex(200,200,25,'A'));
        g1.addVertex(new Vertex(300, 300, 25, 'B'));
        g1.addVertex(new Vertex(400, 500, 25, 'C'));
        g1.addEdge(new Edge(g1.vertices[0], g1.vertices[1], 10));
        g1.addEdge(new Edge(g1.vertices[1], g1.vertices[2], 5));
        return g1;
    });
    

    // const [vertices, setVertices] = useState<Vertex[]>(() => {
    //     const v1 = new Vertex(200, 200, 25, 'A');
    //     const v2 = new Vertex(300, 300, 25, 'B');
    //     return [v1, v2];
    // })

    const handleMouseMove = (e : React.MouseEvent) => {
        if (groupRef&& svgRef.current && isDragging) {
            const { clientX, clientY } = e;
            const { left, top } = svgRef.current.getBoundingClientRect();
            const x = clientX - left;
            const y = clientY - top;
            
            // update circle svg position
            // groupRef.setAttribute('transform', `translate(${x},${y})`);
            // update corresponding vertex position
            // Will Re-render once state is updated.
            setGraph( prevGraph => {
                const index = groupRef.id.charCodeAt(0)-65;
                prevGraph.vertices[index].x = x;
                prevGraph.vertices[index].y = y;
                const g1 = new Graph();
                g1.vertices = prevGraph.vertices;
                g1.edges = prevGraph.edges;
                g1.adjacencyList = prevGraph.adjacencyList;
                return g1;
            })
        }
    }

    const handleMouseDown = (e : React.MouseEvent, vertex: Vertex) => {
        setIsDragging(true);
        const group = e.currentTarget.parentElement;
        if (group instanceof SVGGElement){
            setGroupRef(group);
            setVertex(vertex);
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
            {graph.edges.map( edge => (
                <line
                    key={ `${edge.u.name}${edge.v.name}` }
                    x1={ edge.u.x} 
                    y1={ edge.u.y}
                    x2={ edge.v.x}
                    y2={ edge.v.y}
                    stroke={ edge.strokeColor }
                    strokeWidth={ edge.strokeWidth }
                />
            ))}
            {graph.vertices.map( vertex => (
                <g 
                    key={ vertex.name } 
                    id={vertex.name} 
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
                        onMouseDown={ e => handleMouseDown(e, vertex) }
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