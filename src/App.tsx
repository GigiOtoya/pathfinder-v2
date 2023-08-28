import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { ControlPanel } from "./components/ControlPanel";
import { GraphProvider } from "./context/GraphProvider";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <GraphProvider>
          <ControlPanel />
        </GraphProvider>
      </div>
    </div>
  );
}

export default App;
