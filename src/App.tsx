import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { GraphSVG } from "./components/GraphSVG";
import { ControlPanel } from "./components/ControlPanel";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <ControlPanel />
      </div>
    </div>
  );
}

export default App;
