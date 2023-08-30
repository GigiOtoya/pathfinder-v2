import "./GraphSVG.css";
import { useEffect, useRef, useState } from "react";
import { Point } from "../utils/mathUtils";
import { useGraphContext } from "../context/GraphProvider";
import { ActionTypes, actions } from "../utils/Actions";
import { VerticesSVG } from "./VerticesSVG";
import { EdgesSVG } from "./EdgesSVG";

export type graphProps = {
  action: ActionTypes;
  updateView: (bounds: { minX: number; minY: number; maxX: number; maxY: number }) => void;
};

export const GraphSVG = ({ action, updateView }: graphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { graphState, graphDispatch } = useGraphContext();

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
        updateView({ minX: x, minY: y, maxX: width, maxY: height });
      }
    };

    window.addEventListener("resize", updateViewBox);
    updateViewBox();

    return () => {
      window.removeEventListener("resize", updateViewBox);
    };
  }, []);

  const handleGrabCanvas = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target === e.currentTarget) {
      isPanning.current = true;
      startCoords.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (action === actions.AddVertex) {
      handleDrawVertex(e);
    } else {
      handleGrabCanvas(e);
    }
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (graphState.linking) {
      graphDispatch({ type: "END_LINKING", vertex: null });
    }
    if (isPanning.current) {
      isPanning.current = false;
      setViewBox((prevViewBox) => {
        return {
          x: newViewBox.current.x,
          y: newViewBox.current.y,
          width: prevViewBox.width,
          height: prevViewBox.height,
        };
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const currentCoords = { x: e.clientX, y: e.clientY };
    const { left, top } = e.currentTarget.getBoundingClientRect();

    if (isPanning.current) {
      const dx = viewBox.x + startCoords.current.x - currentCoords.x;
      const dy = viewBox.y + startCoords.current.y - currentCoords.y;
      const viewBoxString = `${dx} ${dy} ${viewBox.width}, ${viewBox.height}`;
      e.currentTarget.setAttribute("viewBox", viewBoxString);
      newViewBox.current = { x: dx, y: dy };
    }

    if (graphState.linking && graphState.active) {
      const x = viewBox.x + e.clientX - left;
      const y = viewBox.y + e.clientY - top;
      endCoords.current = { x: x, y: y };
      startCoords.current = { x: graphState.active.x, y: graphState.active.y };
      drawTemporaryLine(e.currentTarget, startCoords.current, endCoords.current);
    }

    if (graphState.dragging) {
      const x = viewBox.x + e.clientX - left;
      const y = viewBox.y + e.clientY - top;
      graphDispatch({ type: "DRAG_VERTEX", x: x, y: y });
    }
  };

  const handleDrawVertex = (e: React.MouseEvent<SVGSVGElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = viewBox.x + e.clientX - left;
    const y = viewBox.y + e.clientY - top;
    graphDispatch({ type: "NEW_VERTEX", x: x, y: y });
  };

  return (
    <>
      <div className="graph-container">
        <svg
          ref={svgRef}
          cursor={action === actions.AddVertex ? "cell" : "default"}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className="svg"
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseDown={(e) => handleCanvasMouseDown(e)}
          onMouseUp={(e) => handleCanvasMouseUp(e)}
        >
          <EdgesSVG />
          {graphState.linking && (
            <line stroke="cyan" strokeWidth={3} strokeDasharray={10} id="temp-line" />
          )}
          <VerticesSVG action={action} />
        </svg>
      </div>
    </>
  );
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
