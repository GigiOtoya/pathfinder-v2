import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
}

export const Button = ({ text, icon, ...props }: ButtonProps) => {
  return (
    <button {...props}>
      {icon && <img src={icon} alt={`${text} icon`} className="icon" />}
      {text}
    </button>
  );
};
