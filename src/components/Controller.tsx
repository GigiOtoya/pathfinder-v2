import { useRef } from "react";
import { ControlPanel } from "./ControlPanel";
import { GraphSVG } from "./GraphSVG";

export const Controller = () => {
  const canDrag = useRef<boolean>(true);
  const canAddEdge = useRef<boolean>(false);
  const canAddVertex = useRef<boolean>(false);

  return (
    <>
      {/* <ControlPanel /> */}
      {/* <GraphSVG /> */}
    </>
  );
};
