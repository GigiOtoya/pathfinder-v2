import "./GraphSVG.css";
import * as graphs from "../utils/graphs";
import { Graph, Vertex, Edge } from "../utils/graphUtils";
import { EdgesSVG } from "./EdgesSVG";
import { VerticesSVG } from "./VerticesSVG";
import { useEffect, useRef, useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { Point } from "../utils/mathUtils";

export type ActionTypes = "Drag" | "AddVertex" | "AddEdge";

export const actions: Record<ActionTypes, ActionTypes> = {
  Drag: "Drag",
  AddVertex: "AddVertex",
  AddEdge: "AddEdge",
};

export const GraphSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [groupRef, setGroupRef] = useState<SVGGElement | null>(null);
  const [vertexRef, setVertexRef] = useState<Vertex | null>(null);
  const [graphRef, setGraphRef] = useState<Graph>(graphs.starter({ x: 500, y: 500 }));

  const [action, setAction] = useState<ActionTypes>(actions.Drag);

  const canDrag = useRef<boolean>(true);
  const canAddEdge = useRef<boolean>(false);
  const canAddVertex = useRef<boolean>(false);

  const [isAddingEdge, setIsAddingEdge] = useState<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const isPanning = useRef<boolean>(false);

  const newViewBox = useRef<Point>({ x: 0, y: 0 });
  const startCoords = useRef<Point>({ x: 0, y: 0 });
  const endCoords = useRef<Point>({ x: 0, y: 0 });

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

  const drawTemporaryLine = (canvas: SVGSVGElement, start: Point, end: Point) => {
    const line = canvas.querySelector("#temp-line");
    if (line) {
      line.setAttribute("x1", String(start.x));
      line.setAttribute("y1", String(start.y));
      line.setAttribute("x2", String(end.x));
      line.setAttribute("y2", String(end.y));
    }
  };

  const handleGrabCanvas = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target === e.currentTarget) {
      isPanning.current = true;
      startCoords.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (canAddVertex.current) {
      handleDrawVertex(e);
    } else {
      handleGrabCanvas(e);
    }
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isAddingEdge) {
      setIsAddingEdge(false);
    }
    if (isPanning.current) {
      isPanning.current = false;
      setViewBox((prevViewBox) => {
        prevViewBox.x = newViewBox.current.x;
        prevViewBox.y = newViewBox.current.y;
        return prevViewBox;
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const currentCoords = { x: e.clientX, y: e.clientY };
    const { left, top } = e.currentTarget.getBoundingClientRect();

    if (isPanning.current) {
      const dx = viewBox.x - (currentCoords.x - startCoords.current.x);
      const dy = viewBox.y - (currentCoords.y - startCoords.current.y);
      const viewBoxString = `${dx} ${dy} ${viewBox.width}, ${viewBox.height}`;
      e.currentTarget.setAttribute("viewBox", viewBoxString);
      newViewBox.current = { x: dx, y: dy };
    }

    if (isAddingEdge) {
      const x = viewBox.x + e.clientX - left;
      const y = viewBox.y + e.clientY - top;
      endCoords.current = { x: x, y: y };
      drawTemporaryLine(e.currentTarget, startCoords.current, endCoords.current);
    }

    // groupRef && svgRef.current
    if (isDragging.current) {
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
      startCoords.current = { x: vertex.x, y: vertex.y };
      setIsAddingEdge(true);
    }

    const group = e.currentTarget.parentElement;
    if (group instanceof SVGGElement) {
      setGroupRef(group);
      setVertexRef(vertex);
    }
  };

  const handleMouseVertexUp = (e: React.MouseEvent, vertex: Vertex) => {
    if (canDrag.current) {
      setCursorStyle("grab");
      isDragging.current = false;
    } else if (vertexRef && isAddingEdge) {
      graphRef.addEdge(new Edge(vertexRef, vertex));
    }

    if (canAddEdge.current) {
      setIsAddingEdge(false);
    }

    setVertexRef(null);
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
    setAction(actions.Drag);
  };

  const handleAddVertex = () => {
    canDrag.current = false;
    canAddEdge.current = false;
    canAddVertex.current = true;
    setAction(actions.AddVertex);
    setCursorStyle("cell");
  };

  const handleAddEdge = () => {
    canDrag.current = false;
    canAddVertex.current = false;
    canAddEdge.current = true;
    setAction(actions.AddEdge);
    setCursorStyle("crosshair");
  };

  const handleClearGraph = () => {
    setGraphRef(new Graph());
  };

  const handleGenerateRandom = (e: React.MouseEvent) => {
    const coordinates = {
      minX: viewBox.x,
      minY: viewBox.y,
      maxX: viewBox.x + viewBox.width,
      maxY: viewBox.y + viewBox.height,
    };
    setGraphRef(graphs.random(5, 1, coordinates));
  };

  const updateVertex = (vertex: Vertex | null) => {
    setVertexRef(vertex);
  };

  const drawNewEdge = (val: boolean, start: Vertex, end?: Vertex) => {
    startCoords.current = { x: start.x, y: start.y };
    if (end && start !== end) {
      graphRef.addEdge(new Edge(start, end));
    }
    setIsAddingEdge(val);
  };
  return (
    <>
      <ControlPanel
        onAllowDrag={handleAllowDrag}
        onAddVertex={handleAddVertex}
        onAddEdge={handleAddEdge}
        onClearGraph={handleClearGraph}
        onGenerateRandom={(e) => handleGenerateRandom(e)}
        speed={{ min: 0, max: 4 }}
        dense={{ min: 0, max: 1 }}
      />
      <div className="graph-container">
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="svg"
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseDown={(e) => handleCanvasMouseDown(e)}
          onMouseUp={(e) => handleCanvasMouseUp(e)}
        >
          <EdgesSVG edges={graphRef.edges} />
          {isAddingEdge && (
            <line stroke="cyan" strokeWidth={3} strokeDasharray={10} id="temp-line" />
          )}
          <VerticesSVG
            vertices={graphRef.vertices}
            updateVertex={updateVertex}
            isDragging={isDragging}
            drawNewEdge={drawNewEdge}
            action={action}
          />
        </svg>
      </div>
    </>
  );
};
