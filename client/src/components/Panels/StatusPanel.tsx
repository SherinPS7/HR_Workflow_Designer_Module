import React from 'react';
import { Paper, Typography, Chip, Divider, Box } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';

export const StatusPanel: React.FC = () => {
  const { nodes, history, currentHistoryIndex } = useWorkflowStore();

  return (
    <Paper sx={{ width: 280, height: '100%', p: 3, borderLeft: 1, borderColor: 'divider' }} elevation={1}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        📊 Status
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Chip 
          label={`${nodes.length} nodes`} 
          color={nodes.length > 0 ? 'success' : 'default'} 
          variant="filled"
          size="medium"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
        Last Action:
      </Typography>
      <Paper sx={{ p: 2, bgcolor: 'grey.50' }} variant="outlined">
        <Typography variant="body2" noWrap sx={{ fontFamily: 'monospace' }}>
          {history[currentHistoryIndex]?.action || 'Ready to add nodes...'}
        </Typography>
      </Paper>
      
      <Divider sx={{ my: 3 }} />
      <Chip label="Phase 1 ✓" color="primary" variant="outlined" size="small" />
    </Paper>
  );
};
