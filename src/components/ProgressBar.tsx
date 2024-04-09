import { colors } from "../utils/Colors";
import { ReactNode } from "react";

type props = {
  width: number;
  children: ReactNode;
};

export const ProgressBar = ({ width, children }: props) => {
  return (
    <div className="progress-parent-container">
      <div style={{ width: `${width}%` }} className="progress-container">
        <div className="progress-bar" style={{ backgroundColor: colors.GREEN }} />
      </div>
      <div className="progress-children"> {children}</div>
    </div>
  );
};
