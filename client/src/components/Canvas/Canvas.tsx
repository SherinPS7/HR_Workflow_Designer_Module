// src/components/Canvas/Canvas.tsx
import React from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
           // NEW
} from '@xyflow/react';
import { Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { nodeTypes } from '../nodes/NodeFactory';

export const Canvas: React.FC = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const setSelectedNodeId = useWorkflowStore((s) => s.setSelectedNodeId);
const onNodesChange = useWorkflowStore((s) => s.onNodesChange); // NEW

  // NEW: edge callbacks from the store
  const onConnect = useWorkflowStore((s) => s.onConnect);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);

  return (
    <Box sx={{ flex: 1, minHeight: 0, height: '100%' }}>
<ReactFlow
  style={{ width: '100%', height: '100%' }}
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  fitView
  deleteKeyCode="Delete" // instead of 46
  onNodeClick={(_, node) => setSelectedNodeId(node.id)}
  onPaneClick={() => setSelectedNodeId(null)}
  onConnect={onConnect}
  onEdgesChange={onEdgesChange}
  onNodesChange={onNodesChange}
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
