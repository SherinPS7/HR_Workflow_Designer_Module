import { create } from 'zustand';
import type { WorkflowNode, WorkflowEdge, NodeType } from '../types/workflow.types';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  history: Array<{ nodes: WorkflowNode[]; edges: WorkflowEdge[]; action: string }>;
  currentHistoryIndex: number;
  selectedNodeId: string | null;
  addNode: (type: NodeType, position?: { x: number; y: number }) => void;
  setNodeSelected: (id: string | null) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNode['data']>) => void;
  undo: () => void;
  redo: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: [],
  currentHistoryIndex: -1,
  selectedNodeId: null,

  addNode: (type, position = { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 }) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type: type as string,
      position,
      data: { label: `${type.toUpperCase()} NODE` },
      selected: false,
    };

    set((state) => {
      const newNodes = [...state.nodes, newNode];
      const snapshot = {
        nodes: structuredClone(newNodes),
        edges: structuredClone(state.edges),
        action: `Added ${type} node`,
      };

      return {
        nodes: newNodes,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    });
  },

  setNodeSelected: (id) =>
    set((state) => ({
      nodes: state.nodes.map((node) => ({
        ...node,
        selected: id !== null && node.id === id,
      })),
      selectedNodeId: id,
    })),

  updateNodeData: (id, data) =>
    set((state) => {
      const nodes = state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      );

      const snapshot = {
        nodes: structuredClone(nodes),
        edges: structuredClone(state.edges),
        action: `Updated node ${id}`,
      };

      return {
        nodes,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    }),

  undo: () => {
    const state = get();
    if (state.currentHistoryIndex > 0) {
      const prevIndex = state.currentHistoryIndex - 1;
      const prevState = state.history[prevIndex];
      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        currentHistoryIndex: prevIndex,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.currentHistoryIndex < state.history.length - 1) {
      const nextIndex = state.currentHistoryIndex + 1;
      const nextState = state.history[nextIndex];
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        currentHistoryIndex: nextIndex,
      });
    }
  },
}));
