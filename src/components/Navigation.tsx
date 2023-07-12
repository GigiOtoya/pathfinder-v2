import "./Navigation.css";

const algorithms: JSX.Element[] = [
  { id: 0, name: "Dijkstra Shortest Path" },
  { id: 1, name: "Floyd-Warshall (All-Pairs)" },
  { id: 2, name: "Depth First Search (Recursive)" },
  { id: 3, name: "Depth First Search (Iterative)" },
  { id: 4, name: "Breadth First Search" },
  { id: 5, name: "Prim's Minimum Spanning Tree" },
  { id: 6, name: "Kruskal's Minimum Spanning Tree" },
].map((algorithm) => (
  <li key={algorithm.id}>
    {" "}
    <a href={algorithm.name}> {algorithm.name} </a>{" "}
  </li>
));

export const Navigation = () => {
  return <ul className="nav"> {algorithms} </ul>;
};
