import React from 'react';
import { Box, ThemeProvider, IconButton, Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Canvas } from './components/Canvas/Canvas';
import { useWorkflowStore } from './hooks/useWorkflowStore';
import { theme } from './theme';
import { InspectorPanel } from './components/InspectorPanel';

import { ReactFlowProvider } from '@xyflow/react';
// Responsive slide width (still used for right button offset)
const SLIDE_WIDTH = 'clamp(260px, 30vw, 420px)';

const App: React.FC = () => {
  const { undo, redo, currentHistoryIndex } = useWorkflowStore();
  const setActiveInspectorTab = useWorkflowStore((s) => s.setActiveInspectorTab);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);

  const inspectorOpen = Boolean(selectedNodeId);

  const openInspectorTab = (tab: 'details' | 'validation' | 'status') => {
    setActiveInspectorTab(tab);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
      <Header
        onUndo={undo}
        onRedo={redo}
        currentHistoryIndex={currentHistoryIndex}
        onValidate={() => setActiveInspectorTab('validation')}  // NEW
      />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {/* Left sidebar column */}
          <Box
            sx={{
              width: 260,
              flexShrink: 0,
              borderRight: 1,
              borderColor: 'divider',
              overflow: 'hidden',
            }}
          >
            <Sidebar />
          </Box>

          {/* Center canvas column + inspector */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <ReactFlowProvider>
            <Canvas />
      </ReactFlowProvider>
            {/* Right edge vertical button group */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                pr: inspectorOpen ? SLIDE_WIDTH : 0,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '24px 0 0 24px',
                  bgcolor: 'background.paper',
                }}
              >
                <IconButton size="small" onClick={() => openInspectorTab('details')}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small" onClick={() => openInspectorTab('validation')}>
                  <RuleOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small" onClick={() => openInspectorTab('status')}>
                  <ListAltOutlinedIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Box>

            {/* Store-driven sliding inspector */}
            <InspectorPanel />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
