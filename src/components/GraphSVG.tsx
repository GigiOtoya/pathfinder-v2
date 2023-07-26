import "./GraphSVG.css";
import { defaultGraph } from "../utils/graphs";
import { Graph, Vertex, Edge } from "../utils/graphUtils";
import { useEffect, useRef, useState } from "react";
import { Controller } from "./Controller";
import { Point } from "../utils/mathUtils";

export const GraphSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [groupRef, setGroupRef] = useState<SVGGElement | null>(null);
  const [vertexRef, setVertexRef] = useState<Vertex | null>(null);
  const [graphRef, setGraphRef] = useState<Graph>(defaultGraph({ x: 500, y: 500 }));

  const isAddingEdge = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const isPanning = useRef<boolean>(false);

  const newViewBox = useRef<Point>({ x: 0, y: 0 });
  const startCoords = useRef<Point>({ x: 0, y: 0 });

  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const updateViewBox = () => {
      if (svgRef.current) {
        const { x, y } = newViewBox.current;
        const { width, height } = svgRef.current.getBoundingClientRect();
        setViewBox({ x: x, y: y, width: width, height: height });
      }
    };

    window.addEventListener("resize", updateViewBox);
    updateViewBox();

    return () => {
      window.removeEventListener("resize", updateViewBox);
    };
  }, []);

  const changePointer = (style: string) => {
    if (svgRef.current) {
      svgRef.current.style.cursor = style;
    }
  };

  const handleAddVertex = () => {
    setGraphRef((prevGraph) => {
      const name = String.fromCharCode(prevGraph.vertices.length + 65);
      const newVertex = new Vertex(200, 300, 25, name);
      const newGraph = new Graph(prevGraph);
      newGraph.addVertex(newVertex);
      return newGraph;
    });
  };

  const handleAddEdge = () => {
    changePointer("crosshair");
    isAddingEdge.current = true;
  };

  const handleGrabCanvas = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target === e.currentTarget) {
      isPanning.current = true;
      startCoords.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleReleaseCanvas = (e: React.MouseEvent<SVGSVGElement>) => {
    isPanning.current = false;
    setViewBox((prevViewBox) => {
      prevViewBox.x = newViewBox.current.x;
      prevViewBox.y = newViewBox.current.y;
      return prevViewBox;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanning.current) {
      const dx = viewBox.x - (e.clientX - startCoords.current.x);
      const dy = viewBox.y - (e.clientY - startCoords.current.y);
      const viewBoxString = `${dx} ${dy} ${viewBox.width}, ${viewBox.height}`;
      e.currentTarget.setAttribute("viewBox", viewBoxString);
      newViewBox.current = { x: dx, y: dy };
    }

    if (isAddingEdge.current) {
    }

    if (groupRef && svgRef.current && isDragging.current) {
      const { clientX, clientY } = e;
      const { left, top } = svgRef.current.getBoundingClientRect();
      const x = viewBox.x + clientX - left;
      const y = viewBox.y + clientY - top;

      // update circle svg position
      // groupRef.setAttribute('transform', `translate(${x},${y})`);
      // update corresponding vertex position
      // Will Re-render once state is updated.
      setGraphRef((prevGraph) => {
        if (vertexRef && vertexRef.name) {
          const index = vertexRef.name.charCodeAt(0) - 65;
          prevGraph.vertices[index].x = x;
          prevGraph.vertices[index].y = y;
          return new Graph(prevGraph);
        }
        return prevGraph;
      });
    }
  };

  // add addedge logic
  const handleMouseVertexDown = (e: React.MouseEvent, vertex: Vertex) => {
    if (!isAddingEdge.current) {
      changePointer("grabbing");
      isDragging.current = true;
    }

    const group = e.currentTarget.parentElement;
    if (group instanceof SVGGElement) {
      setGroupRef(group);
      setVertexRef(vertex);
    }
  };

  const handleMouseVertexUp = (e: React.MouseEvent, vertex: Vertex) => {
    if (!isAddingEdge.current) {
      changePointer("grab");
      isDragging.current = false;
    } else if (vertexRef) {
      graphRef.addEdge(new Edge(vertexRef, vertex));
    }

    setVertexRef(null);
  };

  const handleMouseVertexEnter = () => {
    if (!isAddingEdge.current) changePointer("grab");
  };

  const handleMouseVertexLeave = () => {
    if (!isAddingEdge.current) changePointer("default");
  };

  return (
    <>
      <Controller onAddVertex={handleAddVertex} onAddEdge={handleAddEdge} />
      <div className="graph-container">
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="svg"
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseDown={(e) => handleGrabCanvas(e)}
          onMouseUp={(e) => handleReleaseCanvas(e)}
        >
          {graphRef.edges.map((edge) => (
            <line
              key={`${edge.u.name}${edge.v.name}`}
              x1={edge.u.x}
              y1={edge.u.y}
              x2={edge.v.x}
              y2={edge.v.y}
              stroke={edge.strokeColor}
              strokeWidth={edge.strokeWidth}
            />
          ))}
          {graphRef.vertices.map((vertex) => (
            <g key={vertex.name} id={vertex.name} transform={`translate(${vertex.x}, ${vertex.y})`}>
              <circle
                cx={0}
                cy={0}
                r={vertex.r}
                fill={vertex.fillColor}
                stroke={vertex.strokeColor}
                strokeWidth={vertex.strokeWidth}
                strokeDasharray={vertex.lineDash.join(" ")}
                onMouseEnter={handleMouseVertexEnter}
                onMouseLeave={handleMouseVertexLeave}
                onMouseDown={(e) => handleMouseVertexDown(e, vertex)}
                onMouseUp={(e) => handleMouseVertexUp(e, vertex)}
              />
              <text
                x={0}
                y={0}
                textAnchor="middle"
                alignmentBaseline="middle"
                style={{ fill: vertex.strokeColor, fontSize: vertex.r }}
              >
                {vertex.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
};
