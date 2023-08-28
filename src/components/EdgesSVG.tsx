import { useGraphContext } from "../context/GraphContext";

export const EdgesSVG = () => {
  const { graphRef, setGraphRef } = useGraphContext();
  return (
    <>
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
    </>
  );
};