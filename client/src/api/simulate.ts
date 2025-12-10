// src/api/simulate.ts
import type { WorkflowNode, WorkflowEdge } from '../types/workflow.types';

export interface SimulationStep {
  id: string;
  message: string;
}

export interface SimulationResult {
  steps: SimulationStep[];
}

export async function simulateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): Promise<SimulationResult> {
  // simple mock: just list nodes in order of id with a basic message
  const steps: SimulationStep[] = nodes.map((node, index) => ({
    id: node.id,
    message: `${index + 1}. ${node.data?.label ?? node.type} step executed`,
  }));

  await new Promise((resolve) => setTimeout(resolve, 500));
  return { steps };
}
