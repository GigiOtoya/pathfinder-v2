import { useGraphContext } from "../context/GraphContext";

export const NodeSelection = () => {
  const { graphRef, setGraphRef } = useGraphContext();
  const options = graphRef.vertices.map((vertices) => (
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
