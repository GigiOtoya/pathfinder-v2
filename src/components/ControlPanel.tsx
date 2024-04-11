import "./ControlPanel.css";
import PlusIcon from "../assets/plus-sign-icon.svg";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { NodeSelection } from "./NodeSelection";
import { GraphSVG } from "./GraphSVG";
import { useState, useRef, useEffect } from "react";
import { Graph } from "../utils/graphUtils";
import * as graphs from "../utils/graphs";
import { ActionTypes, actions } from "../utils/Actions";
import { useGraphContext } from "../context/GraphProvider";
import { PlayButton } from "./PlayButton";

const speeds = { min: 0, max: 4, step: 1, labelStart: "slow", labelEnd: "fast" };
const densities = { min: 0, max: 1, step: 0.1, labelStart: "sparse", labelEnd: "dense" };
const initSpeed = (speeds.min + speeds.max) / 2;
const initDensity = (densities.min + densities.max) / 2;

export const ControlPanel = () => {
  const { graphState, graphDispatch } = useGraphContext();

  const viewBox = useRef({ x: 0, y: 0, width: 0, height: 0 });
  // const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [speed, setSpeed] = useState<number>(initSpeed);
  const [density, setDensity] = useState<number>(initDensity);
  const [action, setAction] = useState<ActionTypes>(actions.Drag);
  const [algorithm, setAlgorithm] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useEffect(() => {
    if (graphState.playing) setAction(actions.Drag);
  }, [graphState.playing]);

  const updateSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const updateDensity = (newDensity: number) => {
    setDensity(newDensity);
  };

  const updateAction = (action?: ActionTypes) => {
    if (action) {
      setAction(action);
    }
  };

  const updateStart = (id: number) => {
    setStart(id);
  };

  const updateEnd = (id: number) => {
    setEnd(id);
  };

  const updateAlgorithm = (id: number) => {
    setAlgorithm(id);
    console.log(algorithm);
  };

  const handleGenerateRandom = () => {
    if (!graphState.playing) {
      const randomGraph: Graph = graphs.random(6, density, viewBox.current);

      graphDispatch({ type: "NEW_GRAPH", graph: randomGraph });
      setStart(0);
      setEnd(0);
    }
  };

  const handleClearGraph = () => {
    if (!graphState.playing) graphDispatch({ type: "NEW_GRAPH", graph: new Graph() });
  };

  const handleRandomizeWeights = () => {
    if (!graphState.playing) graphDispatch({ type: "RANDOM_WEIGHTS" });
  };

  const updateView = (bounds: { x: number; y: number; width: number; height: number }) => {
    viewBox.current = bounds;
    // setViewBox(bounds);
  };
  return (
    <>
      <div className="control-panel">
        <h1> Control Panel </h1>
        <div className="group">
          <Button
            text="Drag"
            onClick={() => updateAction(actions.Drag)}
            className={action === actions.Drag ? "selected" : ""}
          />
          {!graphState.playing && (
            <Button
              text="Node"
              icon={PlusIcon}
              onClick={() => updateAction(actions.AddVertex)}
              className={action === actions.AddVertex ? "selected" : ""}
            />
          )}
          {!graphState.playing && (
            <Button
              text="Edge"
              icon={PlusIcon}
              onClick={() => updateAction(actions.AddEdge)}
              className={action === actions.AddEdge ? "selected" : ""}
            />
          )}
        </div>
        <div className="group">
          <PlayButton algorithm={algorithm} speed={speed} start={start} end={end} />
          <Slider {...speeds} value={speed} update={updateSpeed} />
        </div>
        <div className="group">
          <Button text="Generate Random(6)" onClick={handleGenerateRandom} />
          <Slider {...densities} value={density} update={updateDensity} />
        </div>
        <div className="group">
          <Button text="Clear Graph" onClick={handleClearGraph} />
          {graphState.graph.weighted && (
            <Button text="Randomize Edge Weights" onClick={handleRandomizeWeights} />
          )}
        </div>
        <Navigation updateAlgorithm={updateAlgorithm} />
        <NodeSelection start={start} end={end} setStart={updateStart} setEnd={updateEnd} />
      </div>
      <GraphSVG action={action} viewBox={viewBox.current} updateView={updateView} />
    </>
  );
};
