export type ActionTypes = "Drag" | "AddVertex" | "AddEdge";

export const actions: Record<ActionTypes, ActionTypes> = {
  Drag: "Drag",
  AddVertex: "AddVertex",
  AddEdge: "AddEdge",
};
