import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { GraphSVG } from "./components/GraphSVG";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <GraphSVG />
      </div>
    </div>
  );
}

export default App;
