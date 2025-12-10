// components/InspectorPanel.tsx
import React from 'react';
import { Box, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NodeFormPanel } from './Panels/NodeFormPanel';
import { ValidationPanel } from './Panels/ValidationPanel';
import { StatusPanel } from './Panels/StatusPanel';

interface InspectorPanelProps {
  activeTab: 0 | 1 | 2;
  onChangeTab: (tab: 0 | 1 | 2) => void;
  onClose: () => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({
  activeTab,
  onChangeTab,
  onClose,
}) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
          onChange={(_, v) => onChangeTab(v)}
          variant="fullWidth"
          sx={{ minHeight: 40, flex: 1 }}
        >
          <Tab label="Details" sx={{ minHeight: 40 }} />
          <Tab label="Validation" sx={{ minHeight: 40 }} />
          <Tab label="Status" sx={{ minHeight: 40 }} />
        </Tabs>
        <IconButton size="small" onClick={onClose} sx={{ mr: 1 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, p: 1 }}>
        {activeTab === 0 && <NodeFormPanel />}
        {activeTab === 1 && <ValidationPanel />}
        {activeTab === 2 && <StatusPanel />}
      </Box>
    </Box>
  );
};
