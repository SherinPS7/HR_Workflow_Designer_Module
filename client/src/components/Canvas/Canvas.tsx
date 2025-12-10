// src/components/Canvas/Canvas.tsx
import React from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from '@xyflow/react';
import { Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { nodeTypes } from '../nodes/NodeFactory';

export const Canvas: React.FC = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setSelectedNodeId = useWorkflowStore((s) => s.setSelectedNodeId);

  return (
    <Box sx={{ flex: 1, minHeight: 0, height: '100%' }}>
      <ReactFlow
        style={{ width: '100%', height: '100%' }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
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
