// import { useGraphContext } from "../context/GraphContext";
import { useGraphContext } from "../context/GraphProvider";
export const NodeSelection = () => {
  const { graphState, graphDispatch } = useGraphContext();
  // const { graphRef, setGraphRef } = useGraphContext();
  const options = graphState.graph.vertices.map((vertices) => (
    <option value={vertices.name}> {vertices.name} </option>
  ));
  return (
    <div className="node-selection">
      <div>
        <label htmlFor="start"> Start: </label>
        <select name="start" id="start">
          {options}
        </select>
      </div>
      <div>
        <label htmlFor="end"> End: </label>
        <select name="end" id="end">
          {options}
        </select>
      </div>
    </div>
  );
};
