import { useGraphContext } from "../context/GraphProvider";
import { colors } from "../utils/Colors";
import { getMidpoint, getAngle } from "../utils/mathUtils";

export const EdgesSVG = () => {
  const { graphState, graphDispatch } = useGraphContext();
  const handleBezierCurve = () => {};

  return (
    <>
      {graphState.graph.edges.map((edge) => {
        const center = getMidpoint(edge.u, edge.v);
        const angle = getAngle(edge.u, edge.v);
        return (
          <g key={`${edge.u.name}${edge.v.name}`}>
            {/* <line
              x1={edge.u.x}
              y1={edge.u.y}
              x2={edge.v.x}
              y2={edge.v.y}
              stroke={edge.strokeColor}
              strokeWidth={edge.strokeWidth} */}
            <path
              d={`M${edge.u.x} ${edge.u.y} L${edge.v.x} ${edge.v.y}`}
              stroke={edge.strokeColor}
              strokeWidth={edge.strokeWidth}
            />
            <circle
              cx={center.x}
              cy={center.y}
              r={edge.strokeWidth * 1.3}
              fill={colors.GREY}
              stroke={edge.strokeColor}
              strokeWidth={1.5}
              onClick={handleBezierCurve}
            />
            <text
              x={center.x}
              y={center.y}
              transform={`rotate(${angle} ${center.x} ${center.y})`}
              textAnchor="middle"
              dominantBaseline="text-after-edge"
              style={{ fill: colors.CYAN, fontSize: 16 }}
            >
              {`w=${edge.w}`}
            </text>
          </g>
        );
      })}
    </>
  );
};
