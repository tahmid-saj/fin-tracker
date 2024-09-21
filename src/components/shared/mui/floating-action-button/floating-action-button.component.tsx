import "./floating-action-button.styles.scss"
import React, { Fragment, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
// import NavigationIcon from '@mui/icons-material/Navigation';

interface FloatingActionButtonExtendedSizeProps {
  content: ReactNode | string;
  children: ReactNode
}

export default function FloatingActionButtonExtendedSize({ content, children }: FloatingActionButtonExtendedSizeProps) {
  // return (
    // <Fab variant="extended" size="small" color="primary">
    //   {/* <NavigationIcon sx={{ mr: 1 }} /> */}
    //   Extended
    // </Fab>
  
    // <Fab variant="extended" size="medium" color="primary">
    //   {/* <NavigationIcon sx={{ mr: 1 }} /> */}
    //   Extended
    // </Fab>
  // )

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>

        <Fab variant="extended" size="small" color="primary">
          {/* <NavigationIcon sx={{ mr: 1 }} /> */}
          { content }
          <div className="floating-action-button-children-container">
            { children }
          </div>
        </Fab>
      </Box>
    </Fragment>
  );
}
