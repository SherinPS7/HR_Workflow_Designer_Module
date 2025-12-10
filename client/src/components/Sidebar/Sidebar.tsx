import React from 'react';
import { Paper, Typography, Button, Stack, IconButton, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import type { NodeType } from '../../types/workflow.types';

const nodeConfigs: Array<{ type: NodeType; label: string; emoji: string }> = [
  { type: 'start', label: 'Start Node', emoji: '🎯' },
  { type: 'task', label: 'Task Node', emoji: '📋' },
  { type: 'approval', label: 'Approval Node', emoji: '✅' },
  { type: 'automatedStep', label: 'Automated Node', emoji: '🤖' },
  { type: 'end', label: 'End Node', emoji: '🏁' }
];

export const Sidebar: React.FC = () => {
  const { addNode } = useWorkflowStore();

  return (
    <Paper sx={{ width: 280, height: '100%', p: 3, borderRight: 1, borderColor: 'divider' }} elevation={1}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        📦 Node Library
      </Typography>
      
      <Stack spacing={1.5}>
        {nodeConfigs.map(({ type, label, emoji }) => (
          <Button
            key={type}
            fullWidth
            variant="outlined"
            startIcon={<IconButton size="small"><Add fontSize="small" /></IconButton>}
            onClick={() => addNode(type)}
            sx={{ 
              justifyContent: 'flex-start', 
              textTransform: 'none',
              py: 1.5,
              borderRadius: 2,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <Box sx={{ mr: 1 }}>{emoji}</Box>
            {label}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};
