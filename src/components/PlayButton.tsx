import PlayIcon from "../assets/PlayButton.svg";
import StopIcon from "../assets/StopIcon.svg";
import { breadthFirstSearch } from "../algorithms/BreadthFirstSearch";
import { depthFirstSearchi } from "../algorithms/DepthFirstSearchi";
import { depthFirstSearchr } from "../algorithms/DepthFirstSearchr";
import { dijkstra } from "../algorithms/Dijkstra";
import { floydWarshall } from "../algorithms/FloydWarshall";
import { kruskal } from "../algorithms/Kruskal";
import { prim } from "../algorithms/Prim";
import { useGraphContext } from "../context/GraphProvider";
import { useState, useEffect, useRef } from "react";
import { delay, visualItem } from "../utils/Visualizer";
import { ProgressBar } from "./ProgressBar";

type playProps = {
  algorithm: number;
  speed: number;
  start: number;
  end: number;
};

export const PlayButton = (props: playProps) => {
  const { algorithm, speed, start, end } = props;
  const { graphState, graphDispatch } = useGraphContext();
  const [progress, setProgress] = useState(0);
  const cancelled = useRef<boolean>(false);
  const playSpeed = useRef<number>(speed);

  useEffect(() => {
    playSpeed.current = speed;
  }, [speed]);

  const play = async (results: visualItem[]) => {
    for (let i = 0; i < results.length; i++) {
      if (cancelled.current) {
        cancelled.current = false;
        break;
      }
      const result = results[i];
      graphDispatch({ type: "COLOR", item: result });
      const ms = 1000 - playSpeed.current * 200;
      setProgress(((i + 1) / results.length) * 100);
      await delay(ms);
    }
    graphDispatch({ type: "END_PLAY" });
  };

  const handleButtonClick = () => {
    if (graphState.playing) {
      graphDispatch({ type: "RESET" });
      cancelled.current = true;
      return;
    }

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
        results = depthFirstSearchi(graphState.graph, source, destination);
        break;
      case 3:
        results = depthFirstSearchr(graphState.graph, source, destination);
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
    graphDispatch({ type: "PLAY" });
    play(results);
  };

  return (
    <button onClick={handleButtonClick}>
      <ProgressBar width={graphState.playing ? progress : 0}>
        <img src={graphState.playing ? StopIcon : PlayIcon} alt={`$Play icon`} className="icon" />
        {graphState.playing ? "Playing..." : "Play"}
      </ProgressBar>
    </button>
  );
};
