// src/hooks/useWorkflowStore.ts
import { create } from 'zustand';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge, NodeType } from '../types/workflow.types';
import { validateWorkflow, type ValidationError } from '../utils/graphValidator';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  history: Array<{ nodes: WorkflowNode[]; edges: WorkflowEdge[]; action: string }>;
  currentHistoryIndex: number;
  selectedNodeId: string | null;
  activeInspectorTab: 'status' | 'details' | 'validation';
  validationErrors: ValidationError[];

  addNode: (type: NodeType, position?: { x: number; y: number }) => void;
  setSelectedNodeId: (id: string | null) => void;
  setActiveInspectorTab: (tab: 'status' | 'details' | 'validation') => void;
  updateNodeData: (id: string, data: Partial<WorkflowNode['data']>) => void;

  onConnect: (connection: Connection) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;

  runValidation: () => void;
  undo: () => void;
  redo: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: [],
  currentHistoryIndex: -1,
  selectedNodeId: null,
  activeInspectorTab: 'status',
  validationErrors: [],

  addNode: (type, position = { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 }) => {
    const newNode: WorkflowNode = {
      id: `${type}-${Date.now()}`,
      type: type as string,
      position,
      data: { label: `${type.toUpperCase()} NODE` },
    };

    set((state) => {
      const newNodes = [...state.nodes, newNode];

      const snapshot = {
        nodes: structuredClone(newNodes),
        edges: structuredClone(state.edges),
        action: `Added ${type} node`,
      };

      const result = validateWorkflow(newNodes, state.edges);

      return {
        nodes: newNodes,
        validationErrors: result.errors,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    });
  },

  setSelectedNodeId: (id) =>
    set(() => ({
      selectedNodeId: id,
      activeInspectorTab: 'details',
    })),

  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),

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

      const result = validateWorkflow(nodes, state.edges);

      return {
        nodes,
        validationErrors: result.errors,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    }),

  onConnect: (connection) =>
    set((state) => {
      const newEdges = addEdge(connection, state.edges);

      const snapshot = {
        nodes: structuredClone(state.nodes),
        edges: structuredClone(newEdges),
        action: 'Connected nodes',
      };

      const result = validateWorkflow(state.nodes, newEdges);
      return {
        edges: newEdges,
        validationErrors: result.errors,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    }),

  onEdgesChange: (changes) =>
    set((state) => {
      const newEdges = applyEdgeChanges(changes, state.edges);

      const snapshot = {
        nodes: structuredClone(state.nodes),
        edges: structuredClone(newEdges),
        action: 'Updated edges',
      };

      const result = validateWorkflow(state.nodes, newEdges);
      return {
        edges: newEdges,
        validationErrors: result.errors,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    }),

  onNodesChange: (changes) =>
    set((state) => {
      const newNodes = applyNodeChanges(changes, state.nodes as any) as WorkflowNode[];

      const snapshot = {
        nodes: structuredClone(newNodes),
        edges: structuredClone(state.edges),
        action: 'Updated nodes',
      };

      const result = validateWorkflow(newNodes, state.edges);

      return {
        nodes: newNodes,
        validationErrors: result.errors,
        history: [...state.history.slice(0, state.currentHistoryIndex + 1), snapshot],
        currentHistoryIndex: Math.min(state.currentHistoryIndex + 1, 19),
      };
    }),

  runValidation: () => {
    const { nodes, edges } = get();
    const result = validateWorkflow(nodes, edges);
    set({ validationErrors: result.errors });
  },

  undo: () => {
    const state = get();
    if (state.currentHistoryIndex > 0) {
      const prevIndex = state.currentHistoryIndex - 1;
      const prevState = state.history[prevIndex];
      const result = validateWorkflow(prevState.nodes, prevState.edges);
      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        validationErrors: result.errors,
        currentHistoryIndex: prevIndex,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.currentHistoryIndex < state.history.length - 1) {
      const nextIndex = state.currentHistoryIndex + 1;
      const nextState = state.history[nextIndex];
      const result = validateWorkflow(nextState.nodes, nextState.edges);
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        validationErrors: result.errors,
        currentHistoryIndex: nextIndex,
      });
    }
  },
}));

export const useNodeHasError = (nodeId: string) =>
  useWorkflowStore((s) => s.validationErrors.some((err) => err.nodeId === nodeId));
