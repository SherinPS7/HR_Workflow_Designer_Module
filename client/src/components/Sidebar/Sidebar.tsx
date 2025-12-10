// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import {
  PlayArrow,
  TaskAlt,
  CheckCircle,
  SmartToy,
  Stop,
} from '@mui/icons-material';
import type { NodeType } from '../../types/workflow.types';

const nodeConfigs: Array<{ type: NodeType; label: string; Icon: React.ElementType }> = [
  { type: 'start',         label: 'Start Node',      Icon: PlayArrow },
  { type: 'task',          label: 'Task Node',       Icon: TaskAlt },
  { type: 'approval',      label: 'Approval Node',   Icon: CheckCircle },
  { type: 'automatedStep', label: 'Automated Node',  Icon: SmartToy },
  { type: 'end',           label: 'End Node',        Icon: Stop },
];

export const Sidebar: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    nodeType: NodeType,
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        p: 3,
        borderRight: 1,
        borderColor: 'divider',
        position: 'relative',
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
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
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              py: 1.5,
              borderRadius: 12,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};
