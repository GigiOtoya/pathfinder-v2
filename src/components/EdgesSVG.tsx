import { useGraphContext } from "../context/GraphProvider";
import { colors } from "../utils/Colors";
import { Point, getMidpoint, getAngle } from "../utils/mathUtils";

export const EdgesSVG = () => {
  const { graphState, graphDispatch } = useGraphContext();

  return (
    <>
      {graphState.graph.edges.map((edge) => {
        const center = getMidpoint(edge.u, edge.v);
        const angle = getAngle(edge.u, edge.v);
        return (
          <g key={`${edge.u.name}${edge.v.name}`}>
            <line
              x1={edge.u.x}
              y1={edge.u.y}
              x2={edge.v.x}
              y2={edge.v.y}
              stroke={edge.strokeColor}
              strokeWidth={edge.strokeWidth}
            />
            <text
              x={center.x}
              y={center.y}
              transform={`rotate(${angle} ${center.x} ${center.y})`}
              textAnchor="middle"
              alignmentBaseline="text-after-edge"
              style={{ fill: colors.CYAN, fontSize: 16 }}
            >
              {`w=${1}`}
            </text>
          </g>
        );
      })}
    </>
  );
};
