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

  // Start rules
  if (startNodes.length === 0) {
    errors.push({ code: 'NO_START', message: 'Workflow must contain a Start node.' });
  }
  if (startNodes.length > 1) {
    errors.push({
      code: 'MULTIPLE_START',
      message: 'Workflow must have exactly one Start node.',
    });
  }

  // End rules: at least one End
  if (endNodes.length === 0) {
    errors.push({
      code: 'NO_END',
      message: 'Workflow must contain at least one End node.',
    });
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

  // Per-node degree rules
  nodes.forEach((n) => {
    const inDeg = incomingByNode.get(n.id) ?? 0;
    const outDeg = outgoingByNode.get(n.id) ?? 0;

    // Completely isolated
    if (inDeg === 0 && outDeg === 0) {
      errors.push({
        code: 'ISOLATED_NODE',
        message: 'Node is not connected to the workflow.',
        nodeId: n.id,
      });
    }

    // Non-start nodes should have at least one incoming edge
    if (n.type !== 'start' && inDeg === 0) {
      errors.push({
        code: 'NO_INCOMING',
        message: 'Node must have at least one incoming connection.',
        nodeId: n.id,
      });
    }

    // Non-end nodes should have at least one outgoing edge
    if (n.type !== 'end' && outDeg === 0) {
      errors.push({
        code: 'NO_OUTGOING',
        message: 'Node must have at least one outgoing connection.',
        nodeId: n.id,
      });
    }
  });

  // Reachability from Start (if exactly one start)
  if (startNodes.length === 1) {
    const start = startNodes[0];

    const adj = new Map<string, string[]>();
    edges.forEach((e) => {
      if (!e.source || !e.target) return;
      if (!adj.has(e.source)) adj.set(e.source, []);
      adj.get(e.source)!.push(e.target);
    });

    const visited = new Set<string>();
    const stack = [start.id];
    while (stack.length) {
      const cur = stack.pop()!;
      if (visited.has(cur)) continue;
      visited.add(cur);
      const neigh = adj.get(cur) ?? [];
      neigh.forEach((n) => {
        if (!visited.has(n)) stack.push(n);
      });
    }

    nodes.forEach((n) => {
      if (!visited.has(n.id)) {
        errors.push({
          code: 'UNREACHABLE',
          message: 'Node is not reachable from the Start node.',
          nodeId: n.id,
        });
      }
    });
  }

  return { errors };
}
