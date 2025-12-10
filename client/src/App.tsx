import React from 'react';
import { Box, ThemeProvider, IconButton, Paper } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Slide from '@mui/material/Slide';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Canvas } from './components/Canvas/Canvas';
import { useWorkflowStore } from './hooks/useWorkflowStore';
import { theme } from './theme';
import { InspectorPanel } from './components/InspectorPanel';

// Responsive slide width
const SLIDE_WIDTH = 'clamp(260px, 30vw, 420px)';

const App: React.FC = () => {
  const { undo, redo, currentHistoryIndex } = useWorkflowStore();

  const [inspectorOpen, setInspectorOpen] = React.useState(false);
  const [inspectorTab, setInspectorTab] = React.useState<0 | 1 | 2>(0);

  const openInspector = (tab: 0 | 1 | 2) => {
    setInspectorTab(tab);
    setInspectorOpen(true);
  };

  const closeInspector = () => setInspectorOpen(false);

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

          {/* Center canvas column */}
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
            <Canvas />

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
                <IconButton size="small" onClick={() => openInspector(0)}>
                  <InfoOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small" onClick={() => openInspector(1)}>
                  <RuleOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small" onClick={() => openInspector(2)}>
                  <ListAltOutlinedIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Box>

            {/* Sliding inspector panel */}
            <Slide
              direction="left"
              in={inspectorOpen}
              mountOnEnter
              unmountOnExit
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100%',
                  width: SLIDE_WIDTH,
                  borderLeft: 1,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  boxShadow: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <InspectorPanel
                  activeTab={inspectorTab}
                  onChangeTab={(t: 0 | 1 | 2) => setInspectorTab(t)}
                  onClose={closeInspector}
                />
              </Box>
            </Slide>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
