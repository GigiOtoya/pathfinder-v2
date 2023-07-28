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

  const canDrag = useRef<boolean>(true);
  const canAddEdge = useRef<boolean>(false);
  const canAddVertex = useRef<boolean>(false);

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

  const setCursorStyle = (style: string) => {
    if (svgRef.current) {
      svgRef.current.style.cursor = style;
    }
  };

  const handleAddVertex = () => {
    canDrag.current = false;
    canAddEdge.current = false;
    canAddVertex.current = true;
    setCursorStyle("cell");
  };

  const handleAddEdge = () => {
    canDrag.current = false;
    canAddVertex.current = false;
    canAddEdge.current = true;
    setCursorStyle("crosshair");
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
    const currentCoords = { x: e.clientX, y: e.clientY };
    if (isPanning.current) {
      const dx = viewBox.x - (currentCoords.x - startCoords.current.x);
      const dy = viewBox.y - (currentCoords.y - startCoords.current.y);
      const viewBoxString = `${dx} ${dy} ${viewBox.width}, ${viewBox.height}`;
      e.currentTarget.setAttribute("viewBox", viewBoxString);
      newViewBox.current = { x: dx, y: dy };
    }

    if (isAddingEdge.current) {
    }

    // groupRef && svgRef.current
    if (isDragging.current) {
      console.log(e.currentTarget);
      const { left, top } = e.currentTarget.getBoundingClientRect();
      const x = viewBox.x + e.clientX - left;
      const y = viewBox.y + e.clientY - top;

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

  const handleDrawEdge = (u: Vertex, v: Vertex) => {
    const newEdge = new Edge(u, v);
    graphRef.addEdge(newEdge);
  };

  // add addedge logic
  const handleMouseVertexDown = (e: React.MouseEvent, vertex: Vertex) => {
    if (canDrag.current) {
      isDragging.current = true;
      setCursorStyle("grabbing");
    }

    if (canAddEdge.current) {
      isAddingEdge.current = true;
    }

    const group = e.currentTarget.parentElement;
    if (group instanceof SVGGElement) {
      setGroupRef(group);
      setVertexRef(vertex);
    }
    console.log(group);
  };

  const handleMouseVertexUp = (e: React.MouseEvent, vertex: Vertex) => {
    if (canDrag.current) {
      setCursorStyle("grab");
      isDragging.current = false;
    } else if (vertexRef && isAddingEdge.current) {
      graphRef.addEdge(new Edge(vertexRef, vertex));
    }
    if (canAddEdge.current) {
    }

    setVertexRef(null);
  };

  const handleMouseVertexEnter = () => {
    if (canDrag.current && !isDragging.current) {
      setCursorStyle("grab");
    }
  };

  const handleMouseVertexLeave = () => {
    if (canDrag.current && !isDragging.current) {
      setCursorStyle("default");
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (canAddVertex.current) {
      handleDrawVertex(e);
    } else {
      handleGrabCanvas(e);
    }
  };

  const handleDrawVertex = (e: React.MouseEvent<SVGSVGElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = viewBox.x + e.clientX - left;
    const y = viewBox.y + e.clientY - top;

    setGraphRef((prevGraph) => {
      const name = String.fromCharCode(prevGraph.vertices.length + 65);
      const newVertex = new Vertex(x, y, 25, name);
      const newGraph = new Graph(prevGraph);
      newGraph.addVertex(newVertex);
      return newGraph;
    });
  };

  const handleAllowDrag = () => {
    setCursorStyle("default");
    canAddVertex.current = false;
    canAddEdge.current = false;
    canDrag.current = true;
  };

  return (
    <>
      <Controller
        onAllowDrag={handleAllowDrag}
        onAddVertex={handleAddVertex}
        onAddEdge={handleAddEdge}
      />
      <div className="graph-container">
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="svg"
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseDown={(e) => handleCanvasMouseDown(e)}
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
