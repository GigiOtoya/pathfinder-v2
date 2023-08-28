import { Edge, Graph, Vertex } from "../utils/graphUtils";
import { starter } from "../utils/graphs";

export interface GraphState {
  graph: Graph;
  linking: boolean;
  dragging: boolean;
  active: Vertex | null;
}

export type GraphAction =
  | { type: "NEW_GRAPH"; graph: Graph }
  | { type: "START_DRAG_VERTEX"; vertex: Vertex }
  | { type: "DRAG_VERTEX"; x: number; y: number }
  | { type: "END_DRAG_VERTEX" }
  | { type: "NEW_VERTEX"; x: number; y: number }
  | { type: "NEW_EDGE"; u: Vertex; v: Vertex }
  | { type: "START_LINKING"; vertex: Vertex }
  | { type: "END_LINKING"; vertex: Vertex };

export const initialGraphState: GraphState = {
  graph: new Graph(starter({ x: 500, y: 500 })),
  linking: false,
  dragging: false,
  active: null,
};

export const graphReducer = (state: GraphState, action: GraphAction) => {
  switch (action.type) {
    case "NEW_GRAPH":
      return {
        ...state,
        graph: new Graph(action.graph),
      };

    case "START_DRAG_VERTEX":
      return {
        ...state,
        dragging: true,
        active: action.vertex,
      };

    case "DRAG_VERTEX":
      if (state.active?.name) {
        const index = state.active.name.charCodeAt(0) - 65;
        const newGraph = new Graph(state.graph);
        newGraph.vertices[index].x = action.x;
        newGraph.vertices[index].y = action.y;
        return {
          ...state,
          graph: newGraph,
        };
      }
      return {
        ...state,
      };

    case "END_DRAG_VERTEX":
      return {
        ...state,
        dragging: false,
        active: null,
      };

    case "NEW_VERTEX": {
      const newGraph = new Graph(state.graph);
      const name = String.fromCharCode(newGraph.vertices.length + 65);
      const newVertex = new Vertex(action.x, action.y, 25, name);
      newGraph.addVertex(newVertex);
      return {
        ...state,
        graph: newGraph,
      };
    }

    case "START_LINKING":
      return {
        ...state,
        linking: true,
        active: action.vertex,
      };

    case "END_LINKING": {
      const u = state.active;
      const v = action.vertex;
      if (u && v && u !== v) {
        const newGraph = new Graph(state.graph);
        newGraph.addEdge(new Edge(u, v));

        return {
          ...state,
          graph: newGraph,
          linking: false,
          active: null,
        };
      }
      return {
        ...state,
        linking: false,
        active: null,
      };
    }

    case "NEW_EDGE": {
      const newGraph = new Graph(state.graph);
      newGraph.addEdge(new Edge(action.u, action.v));
      return {
        ...state,
        graph: newGraph,
      };
    }
  }
};
