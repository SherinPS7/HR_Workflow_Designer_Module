import React from 'react';
import { 
  Paper, Typography, Button, Stack, IconButton 
} from '@mui/material';
import { 
  PlayArrow, TaskAlt, CheckCircle, SmartToy, Stop 
} from '@mui/icons-material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import type { NodeType } from '../../types/workflow.types';

const nodeConfigs: Array<{ type: NodeType; label: string; Icon: React.ElementType }> = [
  { type: 'start', label: 'Start Node', Icon: PlayArrow },
  { type: 'task', label: 'Task Node', Icon: TaskAlt },
  { type: 'approval', label: 'Approval Node', Icon: CheckCircle },
  { type: 'automatedStep', label: 'Automated Node', Icon: SmartToy },
  { type: 'end', label: 'End Node', Icon: Stop }
];

export const Sidebar: React.FC = () => {
  const { addNode } = useWorkflowStore();

  return (
    <Paper sx={{ width: 280, height: '100%', p: 3, borderRight: 1, borderColor: 'divider' }} elevation={1}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
         Node Library
      </Typography>
      
      <Stack spacing={1.5}>
        {nodeConfigs.map(({ type, label, Icon }) => (
          <Button
            key={type}
            fullWidth
            variant="outlined"
            startIcon={<Icon />}
            onClick={() => addNode(type)}
            sx={{ 
              justifyContent: 'flex-start', 
              textTransform: 'none',
              py: 1.5,
              borderRadius: 12,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};
