import { Edge, Graph, Vertex } from "../utils/graphUtils";
import { starter } from "../utils/graphs";
import { visualItem } from "../utils/Visualizer";

export interface GraphState {
  graph: Graph;
  linking: boolean;
  dragging: boolean;
  playing: boolean;
  active: Vertex | null;
}

export type GraphAction =
  | { type: "NEW_GRAPH"; graph: Graph }
  | { type: "START_DRAG_VERTEX"; vertex: Vertex }
  | { type: "DRAG_VERTEX"; x: number; y: number }
  | { type: "END_DRAG_VERTEX" }
  | { type: "NEW_VERTEX"; x: number; y: number }
  | { type: "START_LINKING"; vertex: Vertex }
  | { type: "END_LINKING"; vertex: Vertex | null }
  | { type: "COLOR"; item: visualItem }
  | { type: "RANDOM_WEIGHTS" }
  | { type: "RESET" };

export const initialGraphState: GraphState = {
  graph: new Graph(starter({ x: 500, y: 500 })),
  linking: false,
  dragging: false,
  playing: false,
  active: null,
};

export const graphReducer = (state: GraphState, action: GraphAction) => {
  switch (action.type) {
    case "NEW_GRAPH":
      return {
        ...state,
        graph: action.graph,
      };

    case "START_DRAG_VERTEX":
      return {
        ...state,
        dragging: true,
        active: action.vertex,
      };

    case "DRAG_VERTEX":
      if (state.active) {
        const newGraph = new Graph(state.graph);
        const index = state.active.id;
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
      const u = state.active; // referencing old graph
      const v = action.vertex; // referencing old graph

      if (u && v && u !== v) {
        const newGraph = new Graph(state.graph);
        const start = newGraph.vertices[u.id]; // referencing new graph
        const end = newGraph.vertices[v.id]; // referencing new graph
        newGraph.addEdge(new Edge(start, end));

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

    case "COLOR": {
      const newGraph = new Graph(state.graph);
      const items = Array.isArray(action.item.item) ? action.item.item : [action.item];
      for (const item of items) {
        const { item: type, stroke, fill } = item;
        if (type instanceof Vertex) {
          newGraph.vertices[type.id].fillColor = fill ?? type.fillColor;
          newGraph.vertices[type.id].strokeColor = stroke ?? type.strokeColor;
        }
        if (type instanceof Edge) {
          newGraph.edges[type.id].strokeColor = stroke ?? type.strokeColor;
        }
      }

      return {
        ...state,
        graph: newGraph,
      };
    }

    case "RANDOM_WEIGHTS": {
      const newGraph = new Graph(state.graph, state.graph.weighted, state.graph.directed, true);
      newGraph.randomizeWeights();
      return {
        ...state,
        graph: newGraph,
      };
    }

    case "RESET": {
      const newGraph = new Graph(state.graph, state.graph.weighted, state.graph.directed, true);

      return {
        ...state,
        graph: newGraph,
      };
    }
  }
};
