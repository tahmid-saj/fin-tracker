import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper({ styles, children }) {
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
