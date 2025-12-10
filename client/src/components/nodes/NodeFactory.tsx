import { Handle, Position, NodeProps } from '@xyflow/react';
import { Box, Typography } from '@mui/material';
import {
  PlayArrow, TaskAlt, CheckCircle, SmartToy, Stop
} from '@mui/icons-material';

const selectedStyle = {
  boxShadow: '0 0 0 2px #2563EB, 0 12px 32px rgba(37,99,235,0.5)',
  transform: 'scale(1.03)',
};

export const StartNode = ({ data, selected }: NodeProps) => (
  <Box
    sx={{
      width: 120,
      height: 80,
      borderRadius: '50% 20px 50% 20px',
      background: 'linear-gradient(135deg, #4CAF50, #81C784)',
      boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
      transform: 'scale(1)',
      transition: 'box-shadow 120ms ease, transform 120ms ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(selected ? selectedStyle : {}),
    }}
  >
    <Handle type="source" position={Position.Right} style={{ right: -8 }} />
    <Handle type="target" position={Position.Left} style={{ left: -8 }} />
    <Box sx={{ textAlign: 'center', color: 'white' }}>
      <PlayArrow sx={{ fontSize: 28, mb: 0.5 }} />
      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
        {String(data?.label || 'Start')}
      </Typography>
    </Box>
  </Box>
);

export const TaskNode = ({ data, selected }: NodeProps) => (
  <Box
    sx={{
      width: 140,
      height: 90,
      borderRadius: 12,
      background: 'linear-gradient(135deg, #2196F3, #64B5F6)',
      boxShadow: '0 8px 32px rgba(33, 150, 243, 0.4)',
      transform: 'scale(1)',
      transition: 'box-shadow 120ms ease, transform 120ms ease',
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...(selected ? selectedStyle : {}),
    }}
  >
    <Handle type="source" position={Position.Bottom} style={{ bottom: -8 }} />
    <Handle type="target" position={Position.Top} style={{ top: -8 }} />
    <TaskAlt sx={{ fontSize: 32, color: 'white', mb: 1 }} />
    <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
      {String(data?.label || 'Task')}
    </Typography>
  </Box>
);

export const ApprovalNode = ({ data, selected }: NodeProps) => (
  <Box
    sx={{
      width: 100,
      height: 100,
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      background: 'linear-gradient(135deg, #FF9800, #FFB74D)',
      boxShadow: '0 8px 32px rgba(255, 152, 0, 0.4)',
      transform: 'rotate(45deg)',
      transition: 'box-shadow 120ms ease, transform 120ms ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(selected ? { ...selectedStyle, transform: 'rotate(45deg) scale(1.03)' } : {}),
    }}
  >
    <Handle type="source" position={Position.Right} style={{ right: -8, top: '50%' }} />
    <Handle type="target" position={Position.Left} style={{ left: -8, top: '50%' }} />
    <Box sx={{ transform: 'rotate(-45deg)', textAlign: 'center', color: 'white' }}>
      <CheckCircle sx={{ fontSize: 28 }} />
      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem', mt: 0.5 }}>
        {String(data?.label || 'Approval')}
      </Typography>
    </Box>
  </Box>
);

export const AutomatedNode = ({ data, selected }: NodeProps) => (
  <Box
    sx={{
      width: 110,
      height: 95,
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      background: 'linear-gradient(135deg, #360185, #8F0177)',
      boxShadow: '0 12px 40px rgba(54, 1, 133, 0.5)',
      transform: 'scale(1)',
      transition: 'box-shadow 120ms ease, transform 120ms ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(selected ? selectedStyle : {}),
    }}
  >
    <Handle type="source" position={Position.Bottom} style={{ bottom: -8 }} />
    <Handle type="target" position={Position.Top} style={{ top: -8 }} />
    <Box sx={{ textAlign: 'center', color: 'white' }}>
      <SmartToy sx={{ fontSize: 28 }} />
      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem', mt: 0.5 }}>
        {String(data?.label || 'Auto').slice(0, 4)}
      </Typography>
    </Box>
  </Box>
);

export const EndNode = ({ data, selected }: NodeProps) => (
  <Box
    sx={{
      width: 120,
      height: 80,
      borderRadius: '20px 50% 20px 50%',
      background: 'linear-gradient(135deg, #F44336, #E57373)',
      boxShadow: '0 8px 32px rgba(244, 67, 54, 0.4)',
      transform: 'scale(1)',
      transition: 'box-shadow 120ms ease, transform 120ms ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...(selected ? selectedStyle : {}),
    }}
  >
    <Handle type="target" position={Position.Left} style={{ left: -8 }} />
    <Box sx={{ textAlign: 'center', color: 'white' }}>
      <Stop sx={{ fontSize: 32 }} />
      <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
        {String(data?.label || 'End')}
      </Typography>
    </Box>
  </Box>
);

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automatedStep: AutomatedNode,
  end: EndNode,
};
