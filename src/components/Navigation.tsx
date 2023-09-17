import "./Navigation.css";
import PlayIcon from "../assets/PlayButton.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGraphContext } from "../context/GraphProvider";

const algorithms = [
  { id: 0, name: "Dijkstra Shortest Path" },
  { id: 1, name: "Floyd-Warshall (All-Pairs)" },
  { id: 2, name: "Depth First Search (Recursive)" },
  { id: 3, name: "Depth First Search (Iterative)" },
  { id: 4, name: "Breadth First Search" },
  { id: 5, name: "Prim's Minimum Spanning Tree" },
  { id: 6, name: "Kruskal's Minimum Spanning Tree" },
];

type navigationProps = {
  updateAlgorithm: (id: number) => void;
};

export const Navigation = ({ updateAlgorithm }: navigationProps) => {
  const [selected, setSelected] = useState<number>(0);
  const { graphState, graphDispatch } = useGraphContext();

  const handleItemClick = (id: number) => {
    setSelected(id);
    updateAlgorithm(id);
    if (!graphState.playing) {
      graphDispatch({ type: "RESET" });
    }

    if (id === 2 || id === 3 || id === 4) {
      graphDispatch({ type: "UNWEIGHTED" });
    } else {
      graphDispatch({ type: "WEIGHTED" });
    }
  };

  return (
    <>
      <ul className="nav">
        {graphState.playing
          ? algorithms
              .filter((algorithm) => selected === algorithm.id)
              .map((algorithm) => {
                return (
                  <li
                    key={algorithm.name}
                    className={selected === algorithm.id ? "selected" : ""}
                    onClick={() => handleItemClick(algorithm.id)}
                  >
                    {selected === algorithm.id && (
                      <img src={PlayIcon} alt={"arrow"} className="icon" />
                    )}
                    <Link to={"/" + algorithm.name.replaceAll(" ", "")} className="link-style">
                      {algorithm.name}
                    </Link>
                  </li>
                );
              })
          : algorithms.map((algorithm) => (
              <li
                key={algorithm.name}
                className={selected === algorithm.id ? "selected" : ""}
                onClick={() => handleItemClick(algorithm.id)}
              >
                {selected === algorithm.id && <img src={PlayIcon} alt={"arrow"} className="icon" />}
                <Link to={"/" + algorithm.name.replaceAll(" ", "")} className="link-style">
                  {algorithm.name}
                </Link>
              </li>
            ))}
      </ul>
    </>
  );
};
