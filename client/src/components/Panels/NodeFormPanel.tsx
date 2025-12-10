import React, { ChangeEvent } from 'react';
import { Paper, Typography, Box, TextField, MenuItem } from '@mui/material';
import { useWorkflowStore } from '../../hooks/useWorkflowStore';

const ROLE_OPTIONS = ['HR', 'Manager', 'IT', 'Finance', 'Other'];
const APPROVER_ROLES = ['Manager', 'HRBP', 'Director'];

export const NodeFormPanel: React.FC = () => {
  const nodes = useWorkflowStore((s) => s.nodes);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleChange =
    (field: string) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!selectedNode) return;
      updateNodeData(selectedNode.id, { [field]: e.target.value });
    };

  if (!selectedNode) {
    return (
      <Paper
        sx={{
          width: 320,
          height: '100%',
          p: 2.5,
          borderLeft: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
        elevation={1}
      >
        <Typography variant="h6" gutterBottom>
          Node details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a node on the canvas to view its details.
        </Typography>
      </Paper>
    );
  }

  const { type, data } = selectedNode;

  return (
    <Paper
      sx={{
        width: 320,
        height: '100%',
        p: 2.5,
        borderLeft: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
      elevation={1}
    >
      <Typography variant="h6" gutterBottom>
        {String(type).toUpperCase()} node
      </Typography>

      {/* Common title field for all nodes */}
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          Title
        </Typography>
        <TextField
          size="small"
          fullWidth
          value={String(data?.label ?? '')}
          onChange={handleChange('label')}
          placeholder="Enter node title"
        />
      </Box>

      {/* START NODE FIELDS */}
      {type === 'start' && (
        <>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Start title
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={String(data?.startTitle ?? '')}
              onChange={handleChange('startTitle')}
              placeholder="e.g. New Hire Onboarding"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              fullWidth
              label="Metadata key"
              value={String(data?.metaKey ?? '')}
              onChange={handleChange('metaKey')}
            />
            <TextField
              size="small"
              fullWidth
              label="Metadata value"
              value={String(data?.metaValue ?? '')}
              onChange={handleChange('metaValue')}
            />
          </Box>
        </>
      )}

      {/* TASK NODE FIELDS */}
      {type === 'task' && (
        <>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <TextField
              size="small"
              fullWidth
              multiline
              minRows={2}
              value={String(data?.description ?? '')}
              onChange={handleChange('description')}
              placeholder="Describe this task"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Assignee
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={String(data?.assignee ?? '')}
              onChange={handleChange('assignee')}
              placeholder="e.g. John Doe"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Role
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={String(data?.role ?? '')}
              onChange={handleChange('role')}
              placeholder="Select role"
            >
              {ROLE_OPTIONS.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Due date
            </Typography>
            <TextField
              size="small"
              fullWidth
              type="date"
              value={String(data?.dueDate ?? '')}
              onChange={handleChange('dueDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </>
      )}

      {/* APPROVAL NODE FIELDS */}
      {type === 'approval' && (
        <>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Approver role
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={String(data?.approverRole ?? '')}
              onChange={handleChange('approverRole')}
              placeholder="Select approver role"
            >
              {APPROVER_ROLES.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Auto-approve threshold
            </Typography>
            <TextField
              size="small"
              fullWidth
              type="number"
              value={String(data?.autoApproveThreshold ?? '')}
              onChange={handleChange('autoApproveThreshold')}
              placeholder="e.g. 5000"
            />
          </Box>
        </>
      )}

      {/* AUTOMATED STEP NODE FIELDS */}
      {type === 'automatedStep' && (
        <>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Action
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={String(data?.action ?? '')}
              onChange={handleChange('action')}
              placeholder="e.g. send_email"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Parameters (JSON)
            </Typography>
            <TextField
              size="small"
              fullWidth
              multiline
              minRows={2}
              value={String(data?.params ?? '')}
              onChange={handleChange('params')}
              placeholder='e.g. {"to":"user@company.com"}'
            />
          </Box>
        </>
      )}

      {/* END NODE FIELDS */}
      {type === 'end' && (
        <>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              End message
            </Typography>
            <TextField
              size="small"
              fullWidth
              multiline
              minRows={2}
              value={String(data?.endMessage ?? '')}
              onChange={handleChange('endMessage')}
              placeholder="e.g. Onboarding complete"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Summary flag (true / false)
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={String(data?.summaryFlag ?? '')}
              onChange={handleChange('summaryFlag')}
              placeholder="true / false"
            />
          </Box>
        </>
      )}
    </Paper>
  );
};
