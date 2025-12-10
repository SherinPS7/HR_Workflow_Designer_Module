// src/components/Canvas/Canvas.tsx
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useReactFlow,
} from '@xyflow/react';
import { Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { nodeTypes } from '../nodes/NodeFactory';
import type { NodeType } from '../../types/workflow.types';

export const Canvas: React.FC = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setSelectedNodeId = useWorkflowStore((s) => s.setSelectedNodeId);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onConnect = useWorkflowStore((s) => s.onConnect);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const addNode = useWorkflowStore((s) => s.addNode);

  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [addNode, screenToFlowPosition],
  );

  return (
    <Box sx={{ flex: 1, minHeight: 0, height: '100%' }}>
      <ReactFlow
        style={{ width: '100%', height: '100%' }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode="Delete"
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#E5E7EB"
          gap={16}
          size={1}
        />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
};
