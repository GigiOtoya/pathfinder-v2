import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Graph } from "../utils/graphUtils";

export type GraphContextType = {
  graphRef: Graph;
  setGraphRef: Dispatch<SetStateAction<Graph>>;
};

const GraphContext = createContext<GraphContextType | null>(null);

export const useGraphContext = (): GraphContextType => {
  const graphContext = useContext(GraphContext);
  if (!graphContext) {
    throw new Error("Requires GraphContextProvider");
  }
  return graphContext;
};

export default GraphContext;
