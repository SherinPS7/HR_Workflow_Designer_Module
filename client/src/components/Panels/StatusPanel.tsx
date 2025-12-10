import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Chip,
  Divider,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';
import { simulateWorkflow, type SimulationStep } from '../../api/simulate';

export const StatusPanel: React.FC = () => {
  const { nodes, history, currentHistoryIndex, edges } = useWorkflowStore();
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTestWorkflow = async () => {
    setLoading(true);
    const result = await simulateWorkflow(nodes, edges);
    setSteps(result.steps);
    setLoading(false);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: 280,
        height: '100%',
        p: 3,
        borderLeft: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      <Typography variant="h6" align="center">
        Status Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chip
          label={`${nodes.length} Nodes`}
          color={nodes.length > 0 ? 'success' : 'default'}
          variant="filled"
          size="medium"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      <Divider />

      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontWeight: 500 }}
        >
          Last Action
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 1.5,
            bgcolor: 'grey.50',
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{ fontFamily: 'monospace' }}
          >
            {history[currentHistoryIndex]?.action || 'Ready to add nodes...'}
          </Typography>
        </Paper>
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleTestWorkflow}
          disabled={loading || nodes.length === 0}
          sx={{ alignSelf: 'center', borderRadius: 999 }}
        >
          {loading ? 'Simulating…' : 'Test Workflow'}
        </Button>

        {steps.length > 0 && (
          <Box sx={{ mt: 1, flex: 1, overflow: 'auto' }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 0.5 }}
            >
              Execution log
            </Typography>
            <List dense>
              {steps.map((step) => (
                <ListItem key={step.id} sx={{ py: 0.25 }}>
                  <ListItemText primary={step.message} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Chip
          label="Phase 1 Complete"
          color="primary"
          variant="outlined"
          size="small"
        />
      </Box>
    </Paper>
  );
};
