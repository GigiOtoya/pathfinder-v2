// import { useGraphContext } from "../context/GraphContext";
import { useGraphContext } from "../context/GraphProvider";
import { ActionTypes, actions } from "../utils/Actions";
import { Edge, Vertex } from "../utils/graphUtils";

type vertexProps = {
  action: ActionTypes;
};

export const VerticesSVG = ({ action }: vertexProps) => {
  const { graphState, graphDispatch } = useGraphContext();
  // const { graphRef, setGraphRef } = useGraphContext();
  // const isDragging = useRef(false);

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
    console.log(graphState.graph);
  };

  const handleMouseVertexEnter = (e: React.MouseEvent, vertex: Vertex) => {
    if (action === actions.Drag) {
    }
  };

  const handleMouseVertexLeave = () => {
    if (action === actions.Drag) {
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
            //   onMouseEnter={handleMouseVertexEnter}
            //   onMouseLeave={handleMouseVertexLeave}
            onMouseDown={() => handleVertexMouseDown(vertex)}
            onMouseUp={() => handleVertexMouseUp(vertex)}
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
