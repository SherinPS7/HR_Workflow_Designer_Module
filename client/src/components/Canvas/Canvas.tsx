import React from 'react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { nodeTypes } from '../nodes/NodeFactory';

export const Canvas: React.FC = () => {
  const { nodes, edges, setNodeSelected } = useWorkflowStore();

  console.log(
    'nodes selection:',
    nodes.map((n) => ({ id: n.id, selected: n.selected }))
  );

  return (
    <Box sx={{ flex: 1, minHeight: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: '#FAFAFC' }}
        onNodeClick={(_, node) => setNodeSelected(node.id)}
        onPaneClick={() => setNodeSelected(null)}
      >
        <Background color="#E5E7EB" gap={12} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </Box>
  );
};
