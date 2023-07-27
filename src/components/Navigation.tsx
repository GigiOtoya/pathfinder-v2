import { useState } from "react";
import "./Navigation.css";
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

export const Navigation = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setSelected(id);
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
            <Link to={"/" + algorithm.name} className="link-style">
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
