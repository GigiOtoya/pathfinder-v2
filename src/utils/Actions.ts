export type ActionTypes = "Drag" | "AddVertex" | "AddEdge";

export const actions: Record<ActionTypes, ActionTypes> = {
  Drag: "Drag",
  AddVertex: "AddVertex",
  AddEdge: "AddEdge",
};

export const updateCursor = (element: SVGElement, name: string, add: boolean) => {
  if (add) {
    element.classList.add(name);
  } else {
    element.classList.remove(name);
  }
};
