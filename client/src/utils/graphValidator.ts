import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';

export type ValidationErrorCode =
  | 'NO_START'
  | 'NO_END'
  | 'UNREACHABLE_NODE';

export interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  nodeId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[]
): ValidationResult {
  const errors: ValidationError[] = [];

  const startNodes = nodes.filter((n) => n.type === 'start');
  const endNodes = nodes.filter((n) => n.type === 'end');

  if (startNodes.length === 0) {
    errors.push({
      code: 'NO_START',
      message: 'Workflow must contain at least one Start node.',
    });
  }

  if (endNodes.length === 0) {
    errors.push({
      code: 'NO_END',
      message: 'Workflow should contain at least one End node.',
    });
  }

  // Reachability from all start nodes
  const reachable = new Set<string>();
  const adjacency = new Map<string, string[]>();

  edges.forEach((e) => {
    if (!adjacency.has(e.source)) adjacency.set(e.source, []);
    adjacency.get(e.source)!.push(e.target);
  });

  const visitFrom = (id: string) => {
    const stack = [id];
    const seen = new Set<string>();
    while (stack.length) {
      const current = stack.pop()!;
      if (seen.has(current)) continue;
      seen.add(current);
      reachable.add(current);
      const nexts = adjacency.get(current) ?? [];
      nexts.forEach((n) => {
        if (!seen.has(n)) stack.push(n);
      });
    }
  };

  startNodes.forEach((n) => visitFrom(n.id));

  nodes.forEach((n) => {
    if (n.type !== 'start' && !reachable.has(n.id)) {
      errors.push({
        code: 'UNREACHABLE_NODE',
        nodeId: n.id,
        message: `Node ${n.data?.label ?? n.id} is not reachable from any Start node.`,
      });
    }
  });

  return { isValid: errors.length === 0, errors };
}
