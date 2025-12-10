import React from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';

export const ValidationPanel: React.FC = () => {
  const errors = useWorkflowStore((s) => s.validationErrors);

  return (
    <Paper
      sx={{
        width: 320,
        p: 2,
        borderLeft: 1,
        borderColor: 'divider',
        mt: 1,
      }}
      elevation={1}
    >
      <Typography variant="subtitle1" gutterBottom>
        Validation
      </Typography>

      {errors.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No validation errors. Run validation to check this workflow.
        </Typography>
      ) : (
        <List dense>
          {errors.map((err, idx) => (
            <ListItem key={idx} disableGutters>
              <ListItemText
                primary={err.message}
                secondary={err.nodeId ? `Node ID: ${err.nodeId}` : undefined}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
