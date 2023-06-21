import './Controller';
import './Controller.css'
import { Navigation } from './Navigation';

export const Controller = () => {
    return (
        <div className="control-panel">
            <h1> Control Panel </h1>
            <button className="full-btn"> Drag </button>
            <button className="half-btn"> Node </button>
            <button className="half-btn"> Edge </button>
            <button className="half-btn"> Play </button>
            
            <input 
                type="range"
                className="speed-control"
                list="values"
                min="0"
                max="4"
                step="1"></input>
            <button className="full-btn"> Generate Random </button>
            <button className="full-btn"> Clear Graph </button>
            <Navigation/>
        </div>
    )
}