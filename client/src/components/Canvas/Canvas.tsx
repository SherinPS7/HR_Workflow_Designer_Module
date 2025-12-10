import React from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';

export const Canvas: React.FC = () => {
  const { nodes, edges } = useWorkflowStore();

  return (
    <Box sx={{ flex: 1, minHeight: 0 }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        fitView
        style={{ background: '#f8fafc' }}
      >
        <Background color="#e2e8f0" gap={12} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
};
