import "./ControlPanel.css";
import PlayIcon from "../assets/PlayButton.svg";
import PlusIcon from "../assets/plus-sign-icon.svg";
import { Navigation } from "./Navigation";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { NodeSelection } from "./NodeSelection";
import { GraphSVG } from "./GraphSVG";
import { useState, useRef } from "react";
import { Graph } from "../utils/graphUtils";
import * as graphs from "../utils/graphs";
import { ActionTypes, actions } from "../utils/Actions";
import { useGraphContext } from "../context/GraphProvider";
import { dijkstra } from "../algorithms/Dijkstra";
import { delay, visualItem } from "../utils/Visualizer";
import { depthFirstSearchi } from "../algorithms/DepthFirstSearchi";
import { depthFirstSearchr } from "../algorithms/DepthFirstSearchr";
import { breadthFirstSearch } from "../algorithms/BreadthFirstSearch";
import { prim } from "../algorithms/Prim";
import { kruskal } from "../algorithms/Kruskal";
import { floydWarshall } from "../algorithms/FloydWarshall";

const speeds = { min: 0, max: 4, step: 1, labelStart: "slow", labelEnd: "fast" };
const densities = { min: 0, max: 1, step: 0.1, labelStart: "sparse", labelEnd: "dense" };
const initSpeed = (speeds.min + speeds.max) / 2;
const initDensity = (densities.min + densities.max) / 2;

export const ControlPanel = () => {
  const { graphState, graphDispatch } = useGraphContext();

  const viewBox = useRef({ minX: 0, minY: 0, maxX: 0, maxY: 0 });

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(initSpeed);
  const [density, setDensity] = useState<number>(initDensity);
  const [action, setAction] = useState<ActionTypes>(actions.Drag);
  const [algorithm, setAlgorithm] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

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
  };

  const handleGenerateRandom = () => {
    if (!playing) {
      const randomGraph = graphs.random(6, density, viewBox.current);
      graphDispatch({ type: "NEW_GRAPH", graph: randomGraph });
    }
  };

  const handleClearGraph = () => {
    if (!playing) graphDispatch({ type: "NEW_GRAPH", graph: new Graph() });
  };

  const handleRandomizeWeights = () => {
    if (!playing) graphDispatch({ type: "RANDOM_WEIGHTS" });
  };

  const handleVisualize = () => {
    if (playing) return;

    const source = graphState.graph.vertices[start];
    const destination = graphState.graph.vertices[end];
    graphDispatch({ type: "RESET" });

    let results: visualItem[];
    switch (algorithm) {
      case 0:
        results = dijkstra(graphState.graph, source, destination);
        break;
      case 1:
        results = floydWarshall(graphState.graph);
        break;
      case 2:
        results = depthFirstSearchr(graphState.graph, source, destination);
        break;
      case 3:
        results = depthFirstSearchi(graphState.graph, source, destination);
        break;
      case 4:
        results = breadthFirstSearch(graphState.graph, source, destination);
        break;
      case 5:
        results = prim(graphState.graph, source);
        break;
      case 6:
        results = kruskal(graphState.graph);
        break;
      default:
        results = [];
    }
    play(results);
  };

  const play = async (results: visualItem[]) => {
    setPlaying(true);
    for (let result of results) {
      graphDispatch({ type: "COLOR", item: result });
      const ms = 1000 - speed * 200;
      await delay(ms);
    }
    setPlaying(false);
  };

  const updateView = (bounds: { minX: number; minY: number; maxX: number; maxY: number }) => {
    viewBox.current = bounds;
  };
  return (
    <>
      <div className="control-panel">
        <h1> Control Panel </h1>
        <div className="group">
          <Button
            name="Drag"
            action={actions.Drag}
            f={updateAction}
            selected={action === actions.Drag}
          />
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
          <Button name="Play" icon={PlayIcon} f={handleVisualize} />
          <Slider {...speeds} value={speed} update={updateSpeed} />
        </div>
        <div className="group">
          <Button name="Generate Random(6)" f={handleGenerateRandom} />
          <Slider {...densities} value={density} update={updateDensity} />
        </div>
        <div className="group">
          <Button name="Clear Graph" f={handleClearGraph} />
          <Button name="Randomize Edge Weights" f={handleRandomizeWeights} />
        </div>
        <Navigation updateAlgorithm={updateAlgorithm} />
        <NodeSelection start={start} end={end} setStart={updateStart} setEnd={updateEnd} />
      </div>
      <GraphSVG action={action} updateView={updateView} />
    </>
  );
};
