import "./Controller";
import "./Controller.css";
import { Navigation } from "./Navigation";
import PlayIcon from "../assets/PlayButton.svg";
import PlusIcon from "../assets/plus-sign-icon.svg";

export const DragButton = () => <button className="full-btn"> Drag </button>;

export const AddNodeButton = () => (
  <button className="half-btn">
    <img src={PlusIcon} alt="Add Icon" className="icon" />
    Node
  </button>
);

export const AddEdgeButton = () => (
  <button className="half-btn">
    <img src={PlusIcon} alt="Add Icon" className="icon" />
    Edge
  </button>
);

export const PlayButton = () => (
  <button className="half-btn">
    <img src={PlayIcon} alt="Play Icon" className="icon" />
    Play
  </button>
);

export const GenerateRandomButton = () => (
  <button className="full-btn"> Generate Random </button>
);

export const ClearGraphButton = () => (
  <button className="full-btn"> Clear Graph </button>
);

export const NodeSelection = () => (
  <div className="node-selection">
    <div>
      <label htmlFor="start"> Start: </label>
      <select name="start" id="start"></select>
    </div>
    <div>
      <label htmlFor="end"> End: </label>
      <select name="end" id="end"></select>
    </div>
  </div>
);

export type ControllerProps = {
  onAddVertex: () => void;
  onAddEdge: () => void;
};

export const Controller = ({ onAddVertex, onAddEdge }: ControllerProps) => {
  return (
    <div className="control-panel">
      <h1> Control Panel </h1>
      <DragButton />
      <div className="side-by-side">
        <button className="half-btn" onClick={onAddVertex}>
          <img src={PlusIcon} alt="Add Icon" className="icon" />
          Node
        </button>
        <button className="half-btn" onClick={onAddEdge}>
          <img src={PlusIcon} alt="Add Icon" className="icon" />
          Edge
        </button>
      </div>
      <div className="side-by-side">
        <PlayButton />

        <input
          type="range"
          className="speed-control"
          list="values"
          min="0"
          max="4"
          step="1"
        ></input>
      </div>
      <GenerateRandomButton />
      <ClearGraphButton />
      <Navigation />
      <NodeSelection />
    </div>
  );
};
