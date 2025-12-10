import React from 'react';
import { Box,ThemeProvider } from '@mui/material';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Canvas } from './components/Canvas/Canvas';
import { StatusPanel } from './components/Panels/StatusPanel';
import { useWorkflowStore } from './hooks/useWorkflowStore';
import { theme } from './theme';
const App: React.FC = () => {
  const { undo, redo, currentHistoryIndex } = useWorkflowStore();

  return (
    <ThemeProvider theme={theme}  >
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onUndo={undo} onRedo={redo} currentHistoryIndex={currentHistoryIndex} />
      
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Sidebar />
        <Canvas />
        <StatusPanel />
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default App;
