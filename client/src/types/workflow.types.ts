// src/types/workflow.types.ts
import type { Node, Edge } from '@xyflow/react';

export interface NodeData {
  label: string;
  assignee?: string;
  role?: string;
  [key: string]: any;  // Flexible for form data (Phase 3+)
}

export type WorkflowNode = Node<NodeData>;
export type WorkflowEdge = Edge;

export const NODE_TYPES = {
  START: 'start' as const,
  TASK: 'task' as const,
  APPROVAL: 'approval' as const,
  AUTOMATED_STEP: 'automatedStep' as const,  // ✅ Keep your naming
  END: 'end' as const
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];
