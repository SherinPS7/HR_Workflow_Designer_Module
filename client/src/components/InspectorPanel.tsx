// src/components/InspectorPanel.tsx
import React from 'react';
import { Box, Tabs, Tab, IconButton, Paper, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import { NodeFormPanel } from './Panels/NodeFormPanel';
import { ValidationPanel } from './Panels/ValidationPanel';
import { StatusPanel } from './Panels/StatusPanel';

export const InspectorPanel: React.FC = () => {
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const activeTab = useWorkflowStore((s) => s.activeInspectorTab);
  const setActiveTab = useWorkflowStore((s) => s.setActiveInspectorTab);
  const setSelectedNodeId = useWorkflowStore((s) => s.setSelectedNodeId);

  const open = Boolean(selectedNodeId);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    value: 'details' | 'validation' | 'status',
  ) => {
    setActiveTab(value);
  };

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 'clamp(260px, 30vw, 420px)',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ minHeight: 40, flex: 1 }}
          >
            <Tab label="Details" value="details" sx={{ minHeight: 40 }} />
            <Tab label="Validation" value="validation" sx={{ minHeight: 40 }} />
            <Tab label="Status" value="status" sx={{ minHeight: 40 }} />
          </Tabs>
          <IconButton size="small" onClick={handleClose} sx={{ mr: 1 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, p: 1, overflow: 'auto' }}>
  {activeTab === 'details' && <NodeFormPanel />}
  {activeTab === 'validation' && <ValidationPanel />}
  {activeTab === 'status' && <StatusPanel />}
</Box>

      </Paper>
    </Slide>
  );
};
