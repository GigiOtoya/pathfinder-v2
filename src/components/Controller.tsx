import './Controller';
import './Controller.css'
import { Navigation } from './Navigation';
import PlayIcon from '../assets/PlayButton.svg';
import PlusIcon from '../assets/plus-sign-icon.svg';

export const Controller = () => {
    return (
        <div className="control-panel">
            <h1> Control Panel </h1>
            <button className="full-btn"> Drag </button>
            <div className="side-by-side">
                <button className="half-btn"> 
                    <img src={ PlusIcon } alt="Add Icon" className="icon"/>
                    Node 
                </button>
                <button className="half-btn"> 
                    <img src={ PlusIcon } alt="Add Icon" className="icon"/>
                    Edge 
                </button>
            </div>
            <div className="side-by-side">
                <button className="half-btn">
                    <img src={ PlayIcon } alt="Play Icon" className="icon"/> 
                    Play
                </button>
                
                <input 
                    type="range"
                    className="speed-control"
                    list="values"
                    min="0"
                    max="4"
                    step="1"></input>
            </div>
            <button className="full-btn"> Generate Random </button>
            <button className="full-btn"> Clear Graph </button>
            <Navigation/>
        </div>
    )
}