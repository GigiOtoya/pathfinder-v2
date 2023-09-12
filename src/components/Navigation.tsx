import "./Navigation.css";
import PlayIcon from "../assets/PlayButton.svg";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

const algorithms = [
  { id: 0, name: "Dijkstra Shortest Path" },
  { id: 1, name: "Floyd-Warshall (All-Pairs)" },
  { id: 2, name: "Depth First Search (Recursive)" },
  { id: 3, name: "Depth First Search (Iterative)" },
  { id: 4, name: "Breadth First Search" },
  { id: 5, name: "Prim's Minimum Spanning Tree" },
  { id: 6, name: "Kruskal's Minimum Spanning Tree" },
];

const urls = algorithms.map((algo) => {
  const url = algo.name.replace(" ", "");
  return url;
});

type navigationProps = {
  updateAlgorithm: (id: number) => void;
};

export const Navigation = ({ updateAlgorithm }: navigationProps) => {
  const [selected, setSelected] = useState<number>(0);

  const handleItemClick = (id: number) => {
    setSelected(id);
    updateAlgorithm(id);
  };

  return (
    <>
      <ul className="nav">
        {algorithms.map((algorithm) => (
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
      {/* <Routes>
        {algorithms.map((algorithm) => (
          <Route path={"/" + algorithm.name}></Route>
        ))}
      </Routes> */}
    </>
  );
};
