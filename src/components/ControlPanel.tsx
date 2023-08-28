import "./ControlPanel.css";
import PlayIcon from "../assets/PlayButton.svg";
import PlusIcon from "../assets/plus-sign-icon.svg";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { NodeSelection } from "./NodeSelection";
import { GraphSVG } from "./GraphSVG";
// import GraphContext, { GraphContextType } from "../context/GraphContext";

import { useState, useRef, MutableRefObject } from "react";
import { Graph } from "../utils/graphUtils";
import * as graphs from "../utils/graphs";
import { ActionTypes, actions } from "../utils/Actions";
import { useGraphContext } from "../context/GraphProvider";

const speeds = { min: 0, max: 4, step: 1, labelStart: "slow", labelEnd: "fast" };
const densities = { min: 0, max: 1, step: 0.1, labelStart: "sparse", labelEnd: "dense" };
const initSpeed = (speeds.min + speeds.max) / 2;
const initDensity = (densities.min + densities.max) / 2;

export const ControlPanel = () => {
  const { graphState, graphDispatch } = useGraphContext();
  // const [graphRef, setGraphRef] = useState<Graph>(graphs.starter({ x: 500, y: 500 }));
  // const contextValue: GraphContextType = { graphRef, setGraphRef };

  const viewBox = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 });

  const [speed, setSpeed] = useState<number>(initSpeed);
  const [density, setDensity] = useState<number>(initDensity);
  const [action, setAction] = useState<ActionTypes>(actions.Drag);

  const canDrag = useRef(true);
  const canAddEdge = useRef(false);
  const canAddVertex = useRef(false);

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

  const updateRef = (ref: MutableRefObject<boolean>) => {
    [canDrag, canAddEdge, canAddVertex].forEach((currRef) => {
      currRef === ref ? (currRef.current = true) : (currRef.current = false);
    });
  };

  const handleGenerateRandom = () => {
    const randomGraph = graphs.random(7, density, viewBox.current);
    graphDispatch({ type: "NEW_GRAPH", graph: randomGraph });
    // setGraphRef(randomGraph);
  };

  const handleClearGraph = () => {
    // setGraphRef(new Graph());
    graphDispatch({ type: "NEW_GRAPH", graph: new Graph() });
  };

  const updateView = (bounds: { minX: number; minY: number; maxX: number; maxY: number }) => {
    viewBox.current = bounds;
  };

  return (
    <>
      {/* <GraphContext.Provider value={contextValue}> */}
      <div className="control-panel">
        <h1> Control Panel </h1>
        <Button
          name="Drag"
          action={actions.Drag}
          f={updateAction}
          selected={action === actions.Drag}
        />
        <div className="group">
          <Button
            name="Node"
            icon={PlusIcon}
            action={actions.AddVertex}
            f={updateAction}
            selected={action === actions.AddVertex}
          />
          <Button
            name="Edge"
            icon={PlusIcon}
            action={actions.AddEdge}
            f={updateAction}
            selected={action === actions.AddEdge}
          />
        </div>
        <div className="group">
          <Button name="Play" icon={PlayIcon} />
          <Slider {...speeds} value={speed} update={updateSpeed} />
        </div>
        <div className="group">
          <Button name="Generate Random" f={handleGenerateRandom} />
          <Slider {...densities} value={density} update={updateDensity} />
        </div>
        <Button name="Clear Graph" f={handleClearGraph} />
        <Navigation />
        <NodeSelection />
      </div>
      <GraphSVG action={action} updateView={updateView} />
      {/* </GraphContext.Provider> */}
    </>
  );
};