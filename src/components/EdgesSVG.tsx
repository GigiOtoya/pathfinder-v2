import { useGraphContext } from "../context/GraphProvider";

export const EdgesSVG = () => {
  const { graphState, graphDispatch } = useGraphContext();

  return (
    <>
      {graphState.graph.edges.map((edge) => (
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
