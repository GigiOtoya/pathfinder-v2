import { MutableRefObject, ReactNode } from "react";

interface ButtonProps {
  name: string;
  icon?: string;
  Ref?: MutableRefObject<boolean>;
  f?: (ref?: any) => void;
}

export const Button = ({ name, icon, Ref, f }: ButtonProps) => {
  const handleButtonClick = () => {
    if (Ref && f) {
      f(Ref);
    } else if (f) {
      f();
    }
  };

  return (
    <button onClick={handleButtonClick}>
      {icon && <img src={icon} alt={`${name} icon`} className="icon" />}
      {name}
    </button>
  );
};
