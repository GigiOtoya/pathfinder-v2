import "./ControlPanel";
import "./ControlPanel.css";
import { Navigation } from "./Navigation";
import PlayIcon from "../assets/PlayButton.svg";
import PlusIcon from "../assets/plus-sign-icon.svg";

export const PlayButton = () => (
  <button className="half-btn">
    <img src={PlayIcon} alt="Play Icon" className="icon" />
    Play
  </button>
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

export type ControlPanelProps = {
  onAddVertex: () => void;
  onAddEdge: () => void;
  onAllowDrag: () => void;
  onClearGraph: () => void;
  onGenerateRandom: (e: React.MouseEvent) => void;
  speed: { min: number; max: number };
  dense: { min: number; max: number };
};

export const ControlPanel = (props: ControlPanelProps) => {
  return (
    <div className="control-panel">
      <h1> Control Panel </h1>
      <button className="full-btn" onClick={props.onAllowDrag}>
        Drag
      </button>
      <div className="side-by-side">
        <button className="half-btn" onClick={props.onAddVertex}>
          <img src={PlusIcon} alt="Add Icon" className="icon" />
          Node
        </button>
        <button className="half-btn" onClick={props.onAddEdge}>
          <img src={PlusIcon} alt="Add Icon" className="icon" />
          Edge
        </button>
      </div>
      <div className="side-by-side">
        <PlayButton />
        <div className="control-item">
          <input
            type="range"
            id="speed-control"
            min={props.speed.min}
            max={props.speed.max}
            step="1"
          ></input>
          <div className="slider-labels">
            <span className="label start">slow</span>
            <span className="label end">fast</span>
          </div>
        </div>
      </div>
      <div className="side-by-side">
        <button className="half-btn" onClick={props.onGenerateRandom}>
          Generate
          <br />
          Random
        </button>
        <div className="control-item">
          <input
            type="range"
            id="density-control"
            min={props.dense.min}
            max={props.dense.max}
            step=".1"
          ></input>
          <div className="slider-labels">
            <span className="label start">sparse</span>
            <span className="label end">dense</span>
          </div>
        </div>
      </div>
      <button className="full-btn" onClick={props.onClearGraph}>
        {" "}
        Clear Graph{" "}
      </button>
      <Navigation />
      <NodeSelection />
    </div>
  );
};
