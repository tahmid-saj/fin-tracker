import { useState, ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLOR_CODES } from '../../../../utils/constants/shared.constants';

interface AccordionTransitionProps {
  styles?: object;
  header?: string;
  children: ReactNode;
}

export function AccordionTransition({ styles = {}, header = "", children }: AccordionTransitionProps) {
  const [expanded, setExpanded] = useState(true);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        sx={{
          width: "100%",
          marginBottom: "0.75%",
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          ...styles
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ color: COLOR_CODES.general["4"] }} paragraph>{header}</Typography>
        </AccordionSummary>
        
        {/* Manually manage the Fade transition for the content */}
        <Fade in={expanded} timeout={400}>
          <AccordionDetails>
            {children}
          </AccordionDetails>
        </Fade>
      </Accordion>
    </div>
  );
}
