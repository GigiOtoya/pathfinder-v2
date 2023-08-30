import { ActionTypes } from "../utils/Actions";

interface ButtonProps {
  name: string;
  icon?: string;
  action?: ActionTypes;
  f?: (action?: ActionTypes) => void | (() => void);
  selected?: boolean;
}

export const Button = ({ name, icon, action, f, selected }: ButtonProps) => {
  const handleButtonClick = () => {
    if (f) {
      action ? f(action) : f();
    }
  };

  return (
    <button onClick={handleButtonClick} className={selected ? "selected" : ""}>
      {selected && <div className="accent"></div>}
      {icon && <img src={icon} alt={`${name} icon`} className="icon" />}
      {name}
    </button>
  );
};
