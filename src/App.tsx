import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Controller } from './components/Controller';
import { Canvas } from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Controller/>
        <Canvas/>
      </div>
    </div>
  );
}

export default App;