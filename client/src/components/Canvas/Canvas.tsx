// src/components/Canvas/Canvas.tsx
import React from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { nodeTypes } from '../nodes/NodeFactory';

export const Canvas: React.FC = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setSelectedNodeId = useWorkflowStore((s) => s.setSelectedNodeId);

  return (
    <Box sx={{ flex: 1, minHeight: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: '#FAFAFC' }}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
      >
        <Background color="#E5E7EB" gap={12} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
};
