import Box from '@mui/material/Box';
import React from 'react';
import { forwardRef } from 'react';

interface CenteredContainerProps {
  children: React.ReactNode;
  maxWidth?: number;
}

export const CenteredContainer = forwardRef<HTMLDivElement, CenteredContainerProps>(
  ({ children, maxWidth = 422 }, ref) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'relative',
    }}
    >
      <Box
        sx={{
          maxWidth,
          width: '100%',
          padding: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div ref={ref}>{children}</div>
      </Box>
    </Box>
  )
);
