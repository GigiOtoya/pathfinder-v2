import { RefObject, useRef, useState, MutableRefObject } from "react";
import { Vertex, Graph } from "../utils/graphUtils";
import { actions, ActionTypes } from "./GraphSVG";

type VerticesSVGProps = {
  vertices: Vertex[];
  updateVertex: (vertex: Vertex | null) => void;
  isDragging: MutableRefObject<boolean>;
  drawNewEdge: (val: boolean, source: Vertex, end?: Vertex) => void;
  action: ActionTypes;
};

export const VerticesSVG = (props: VerticesSVGProps) => {
  const { vertices, updateVertex, isDragging, drawNewEdge, action } = props;
  const sourceVertex = useRef<Vertex | null>(null);

  const handleMouseVertexDown = (e: React.MouseEvent, vertex: Vertex) => {
    if (action === actions.Drag) {
      isDragging.current = true;
      // setCursorStyle("grabbing");
    }
    if (action === actions.AddEdge) {
      // setCursorStyle("crosshair");
      sourceVertex.current = vertex;
      drawNewEdge(true, vertex);
    }
    updateVertex(vertex);
  };

  const handleMouseVertexUp = (e: React.MouseEvent, vertex: Vertex) => {
    if (action === actions.Drag) {
      // setCursorStyle("grab");
      isDragging.current = false;
    }
    if (action === actions.AddEdge) {
      // setCursorStyle("crosshair");
      if (sourceVertex.current) {
        drawNewEdge(false, sourceVertex.current, vertex);
      }
    }
    updateVertex(null);
  };

  const handleMouseVertexEnter = () => {
    if (action === actions.Drag && !isDragging.current) {
      // setCursorStyle("grab");
    }
  };

  const handleMouseVertexLeave = () => {
    if (action === actions.Drag && !isDragging.current) {
      // setCursorStyle("default");
    }
  };

  return (
    <>
      {vertices.map((vertex) => (
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
            dominantBaseline="middle"
            style={{ fill: vertex.strokeColor, fontSize: vertex.r }}
          >
            {vertex.name}
          </text>
        </g>
      ))}
    </>
  );
};
