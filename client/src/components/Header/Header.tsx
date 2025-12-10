import React from 'react';
import { AppBar, Toolbar, Typography, Chip, IconButton, Box } from '@mui/material';
import { Undo, Redo } from '@mui/icons-material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';

interface HeaderProps {
  onUndo: () => void;
  onRedo: () => void;
  currentHistoryIndex: number;
}

export const Header: React.FC<HeaderProps> = ({ onUndo, onRedo, currentHistoryIndex }) => {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6">HR Workflow Designer</Typography>
          <Chip label="Phase 1" size="small" color="success" />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={onUndo} disabled={currentHistoryIndex <= 0} color="inherit" title="Undo">
            <Undo />
          </IconButton>
          <IconButton onClick={onRedo} disabled={currentHistoryIndex >= 19} color="inherit" title="Redo">
            <Redo />
          </IconButton>
          <Chip label={`H:${currentHistoryIndex + 1}/20`} size="small" color="secondary" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
