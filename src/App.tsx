import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Controller } from './components/Controller';
// import { SVG } from './components/Canvas';
import { GraphSVG } from './components/GraphSVG';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Controller/>
        <GraphSVG/>
      </div>
    </div>
  );
}

export default App;