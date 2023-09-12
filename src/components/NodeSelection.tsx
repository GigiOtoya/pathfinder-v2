import { useGraphContext } from "../context/GraphProvider";
type selectionProps = {
  start: number;
  end: number;
  setStart: (id: number) => void;
  setEnd: (id: number) => void;
};
export const NodeSelection = (props: selectionProps) => {
  const { graphState, graphDispatch } = useGraphContext();

  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseFloat(e.currentTarget.value);
    props.setStart(id);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseFloat(e.currentTarget.value);
    props.setEnd(id);
  };

  const options = graphState.graph.vertices.map((vertex) => (
    <option key={vertex.name} value={vertex.id}>
      {vertex.name}
    </option>
  ));

  return (
    <div className="node-selection">
      <div>
        <label htmlFor="start"> Start: </label>
        <select name="start" id="start" value={props.start} onChange={handleStartChange}>
          {options}
        </select>
      </div>
      <div>
        <label htmlFor="end"> End: </label>
        <select name="end" id="end" value={props.end} onChange={handleEndChange}>
          {options}
        </select>
      </div>
    </div>
  );
};
