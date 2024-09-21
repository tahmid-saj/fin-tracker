import { Fragment, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface OutlineCardProps {
  styles?: object;
  header?: string;
  content?: ReactNode | string;
  children?: ReactNode
}

export default function OutlinedCard({ styles, header, content, children }: OutlineCardProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card 
        sx={ styles } 
        variant="outlined">
        <Fragment>
          <CardContent>
            {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography> */}
            
            {
              header ? 
            <Typography variant="h6" component="div">
              { header }
            </Typography> : null
            }

            {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography> */}

            {
              content ?
              <Typography variant="body2">
                { content }
              </Typography> : null
            }

            {
              children ? children : null
            }
          </CardContent>

          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Fragment>
      </Card>
    </Box>
  );
}
