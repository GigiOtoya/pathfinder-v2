import logo from "../assets/logo.svg";
import "./Header.css";

export const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="Logo" />
      <h1> Pathfinding Visualizer </h1>
    </nav>
  );
};
