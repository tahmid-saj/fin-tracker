import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

interface SimplePaperProps {
  styles: object;
  children: ReactNode
}

export default function SimplePaper({ styles, children }: SimplePaperProps) {
  return (
    <Box
      sx={{
        display: 'block',
        flexWrap: 'wrap',
        '& > :not(style)': {
          p: 2
        },
      }}
    >
      <Paper sx={ styles }>
        { children }
      </Paper>
    </Box>
  );
}
