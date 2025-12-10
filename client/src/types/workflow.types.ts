// src/types/workflow.types.ts
import type { Node, Edge } from '@xyflow/react';

export interface NodeData {
  label: string;
  [key: string]: any;  // Flexible for form data
}

export type WorkflowNode = Node<NodeData>;
export type WorkflowEdge = Edge;

export const NODE_TYPES = {
  START: 'start' as const,
  TASK: 'task' as const,
  APPROVAL: 'approval' as const,
  AUTOMATED_STEP: 'automatedStep' as const,
  END: 'end' as const
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];
