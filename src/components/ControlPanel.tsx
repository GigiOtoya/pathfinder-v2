import "./ControlPanel.css";
import PlayIcon from "../assets/PlayButton.svg";
import PlusIcon from "../assets/plus-sign-icon.svg";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { NodeSelection } from "./NodeSelection";
import { GraphSVG } from "./GraphSVG";
import GraphContext, { GraphContextType } from "../context/GraphContext";
import { useState, useRef, MutableRefObject } from "react";
import { Graph } from "../utils/graphUtils";
import * as graphs from "../utils/graphs";

const speeds = { min: 0, max: 4, step: 1, labelStart: "slow", labelEnd: "fast" };
const densities = { min: 0, max: 1, step: 0.1, labelStart: "sparse", labelEnd: "dense" };
const initSpeed = (speeds.min + speeds.max) / 2;
const initDensity = (densities.min + densities.max) / 2;

export const ControlPanel = () => {
  const [graphRef, setGraphRef] = useState<Graph>(graphs.starter({ x: 500, y: 500 }));
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const contextValue: GraphContextType = { graphRef, setGraphRef };

  const [speed, setSpeed] = useState<number>(initSpeed);
  const [density, setDensity] = useState<number>(initDensity);

  const canDrag = useRef(true);
  const canAddEdge = useRef(false);
  const canAddVertex = useRef(false);

  type Operation = "Drag" | "AddEdge" | "AddVertex";
  const [operation, setOperation] = useState(canDrag);

  const updateGraph = (newGraph: Graph) => {
    setGraphRef(newGraph);
  };

  const updateSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const updateDensity = (newDensity: number) => {
    setDensity(newDensity);
  };

  const updateRef = (ref: MutableRefObject<boolean>) => {
    [canDrag, canAddEdge, canAddVertex].forEach((currRef) => {
      currRef === ref ? (currRef.current = true) : (currRef.current = false);
    });
  };

  const handleGenerateRandom = () => {};

  const handleClearGraph = () => {
    setGraphRef(new Graph());
  };

  return (
    <>
      <GraphContext.Provider value={contextValue}>
        <div className="control-panel">
          <h1> Control Panel </h1>
          <Button name="Drag" Ref={canDrag} f={updateRef} />
          <div className="group">
            <Button name="Node" icon={PlusIcon} Ref={canAddVertex} f={updateRef} />
            <Button name="Edge" icon={PlusIcon} Ref={canAddEdge} f={updateRef} />
          </div>
          <div className="group">
            <Button name="Play" icon={PlayIcon} />
            <Slider {...speeds} value={speed} update={updateSpeed} />
          </div>
          <div className="group">
            <Button name="Generate Random" />
            <Slider {...densities} value={density} update={updateDensity} />
          </div>
          <Button name="Clear Graph" f={handleClearGraph} />
          <Navigation />
          <NodeSelection />
        </div>
        <GraphSVG
          updateGraph={updateGraph}
          canDrag={canDrag}
          canAddEdge={canAddEdge}
          canAddVertex={canAddVertex}
        />
      </GraphContext.Provider>
    </>
  );
};
