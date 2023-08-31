import { useGraphContext } from "../context/GraphProvider";
import { ActionTypes, actions, updateCursor } from "../utils/Actions";
import { Vertex } from "../utils/graphUtils";

type vertexProps = {
  action: ActionTypes;
};

export const VerticesSVG = ({ action }: vertexProps) => {
  const { graphState, graphDispatch } = useGraphContext();

  const handleVertexMouseDown = (vertex: Vertex) => {
    if (action === actions.Drag) {
      graphDispatch({ type: "START_DRAG_VERTEX", vertex });
    }
    if (action === actions.AddEdge) {
      graphDispatch({ type: "START_LINKING", vertex: vertex });
    }
  };

  const handleVertexMouseUp = (vertex: Vertex) => {
    if (action === actions.Drag) {
      graphDispatch({ type: "END_DRAG_VERTEX" });
    }

    if (action === actions.AddEdge) {
      graphDispatch({ type: "END_LINKING", vertex: vertex });
    }
  };

  const handleMouseVertexEnter = (e: React.MouseEvent<SVGCircleElement>) => {
    const circle = e.currentTarget;
    if (action === actions.Drag) {
      updateCursor(circle, "drag", true);
    }
    if (action === actions.AddEdge) {
      updateCursor(circle, "link", true);
    }
  };

  const handleMouseVertexLeave = (e: React.MouseEvent<SVGCircleElement>) => {
    const circle = e.currentTarget;
    if (action === actions.Drag) {
      updateCursor(circle, "drag", false);
    }
    if (action === actions.AddEdge) {
      updateCursor(circle, "link", false);
    }
  };

  return (
    <>
      {graphState.graph.vertices.map((vertex) => (
        <g key={vertex.name} id={vertex.name} transform={`translate(${vertex.x}, ${vertex.y})`}>
          <circle
            cx={0}
            cy={0}
            r={vertex.r}
            fill={vertex.fillColor}
            stroke={vertex.strokeColor}
            strokeWidth={vertex.strokeWidth}
            strokeDasharray={vertex.lineDash.join(" ")}
            onMouseEnter={(e) => handleMouseVertexEnter(e)}
            onMouseLeave={(e) => handleMouseVertexLeave(e)}
            onMouseDown={() => handleVertexMouseDown(vertex)}
            onMouseUp={() => handleVertexMouseUp(vertex)}
          />
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: vertex.strokeColor, fontSize: vertex.r, fontWeight: "bold" }}
          >
            {vertex.name}
          </text>
        </g>
      ))}
    </>
  );
};
