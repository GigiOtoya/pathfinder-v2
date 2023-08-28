import { createContext, useContext, useReducer, Dispatch, ReactNode, JSX } from "react";
import { graphReducer, GraphState, GraphAction, initialGraphState } from "../reducers/graphReducer";

type GraphContextType = {
  graphState: GraphState;
  graphDispatch: Dispatch<GraphAction>;
};

const GraphContext = createContext<GraphContextType | null>(null);

type Props = {
  children: ReactNode;
};
export const GraphProvider = ({ children }: Props): JSX.Element => {
  const [graphState, graphDispatch] = useReducer(graphReducer, initialGraphState);

  return (
    <GraphContext.Provider value={{ graphState, graphDispatch }}>{children}</GraphContext.Provider>
  );
};

export const useGraphContext = (): GraphContextType => {
  const graphContext = useContext(GraphContext);
  if (!graphContext) {
    throw new Error("Requires GraphContextProvider");
  }
  return graphContext;
};
