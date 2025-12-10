// src/hooks/useWorkflowStore.ts
import { create } from 'zustand';
import type { WorkflowNode, WorkflowEdge, NodeType } from '../types/workflow.types';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  history: Array<{ nodes: WorkflowNode[]; edges: WorkflowEdge[]; action: string }>;
  currentHistoryIndex: number;
  addNode: (type: NodeType, position?: { x: number; y: number }) => void;
  undo: () => void;
  redo: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: [],
  currentHistoryIndex: -1,

  addNode: (type, position = { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 }) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type: type as string,
      position,
      data: { label: `${type.toUpperCase()} NODE` }
    };

    set((state) => {
      const newNodes = [...state.nodes, newNode];
      const snapshot = {
        nodes: structuredClone(newNodes),
        edges: structuredClone(state.edges),
        action: `Added ${type} node`
      };

      return {
        nodes: newNodes,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19)
      };
    });
  },

  undo: () => {
    const state = get();
    if (state.currentHistoryIndex > 0) {
      const prevIndex = state.currentHistoryIndex - 1;
      const prevState = state.history[prevIndex];
      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        currentHistoryIndex: prevIndex
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
        currentHistoryIndex: nextIndex
      });
    }
  }
}));
