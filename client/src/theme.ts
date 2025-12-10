// src/theme.ts - FIXED HOVER ROUNDED CORNERS
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#360185' },
    secondary: { main: '#8F0177' },
    error: { main: '#DE1A58' },
    warning: { main: '#F4B342' },
    background: { 
      default: '#FAFAFC', 
      paper: '#FFFFFF' 
    },
    divider: '#E5E7EB',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h6: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,                // 🎯 Base rounded
          padding: '14px 28px',
          fontWeight: 700,
          boxShadow: '0 4px 16px rgba(54,1,133,0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderRadius: 12,              // 🎯 FIXED: Hover stays rounded
            boxShadow: '0 8px 32px rgba(54,1,133,0.35)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #360185 0%, #8F0177 50%, #DE1A58 100%)',
        },
        outlined: {
          borderWidth: '2px',
          borderRadius: 12,                // 🎯 Outline base rounded
          '&:hover': { 
            borderRadius: 12,              // 🎯 FIXED: Outline hover rounded
            backgroundColor: 'rgba(222,26,88,0.08)',
            borderColor: '#F4B342',
          },
        },
      },
    },
    // Sharp panels/chips/appbar unchanged...
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 20px rgba(54,1,133,0.12)',
          border: '1px solid #E5E7EB',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 36,
          fontWeight: 700,
          fontSize: '0.85rem',
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#DE1A58',
          boxShadow: '0 4px 20px rgba(54,1,133,0.3)',
          borderBottom: '1px solid #E5E7EB',
        },
      },
    },
  },
});
