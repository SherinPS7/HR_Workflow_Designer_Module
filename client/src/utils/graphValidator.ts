// utils/graphValidator.ts
import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';

export interface ValidationError {
  code: string;
  message: string;
  nodeId?: string;
}

export interface ValidationResult {
  errors: ValidationError[];
}

export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): ValidationResult {
  const errors: ValidationError[] = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  const endNodes = nodes.filter((n) => n.type === 'end');

  if (startNodes.length === 0) {
    errors.push({ code: 'NO_START', message: 'Workflow must contain a Start node.' });
  }
  if (startNodes.length > 1) {
    errors.push({ code: 'MULTIPLE_START', message: 'Workflow must have exactly one Start node.' });
  }

  const outgoingByNode = new Map<string, number>();
  const incomingByNode = new Map<string, number>();

  edges.forEach((e) => {
    if (!e.source || !e.target) return;
    outgoingByNode.set(e.source, (outgoingByNode.get(e.source) ?? 0) + 1);
    incomingByNode.set(e.target, (incomingByNode.get(e.target) ?? 0) + 1);
  });

  // Start must have at least one outgoing edge
  if (startNodes.length === 1) {
    const start = startNodes[0];
    if ((outgoingByNode.get(start.id) ?? 0) === 0) {
      errors.push({
        code: 'START_NO_OUTGOING',
        message: 'Start node must have at least one outgoing connection.',
        nodeId: start.id,
      });
    }
  }

  // End nodes must have no outgoing edges
  endNodes.forEach((end) => {
    if ((outgoingByNode.get(end.id) ?? 0) > 0) {
      errors.push({
        code: 'END_HAS_OUTGOING',
        message: 'End node cannot have outgoing connections.',
        nodeId: end.id,
      });
    }
  });

  // Optional: no isolated nodes
  nodes.forEach((n) => {
    const inDeg = incomingByNode.get(n.id) ?? 0;
    const outDeg = outgoingByNode.get(n.id) ?? 0;
    if (inDeg === 0 && outDeg === 0) {
      errors.push({
        code: 'ISOLATED_NODE',
        message: 'Node is not connected to the workflow.',
        nodeId: n.id,
      });
    }
  });

  return { errors };
}
