import "./media-card.styles"
import { CardMediaContainer } from "./media-card.styles";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MediaCard({ styles, header, imageUrl, imageTitle, path, content }) {
  const navigate = useNavigate()

  return (
      <Card sx={{ margin: "1%", ...styles }} onClick={ () => navigate(path) }>
        <CardMediaContainer>
          <CardMedia
            // sx={{ height: styles.height }}
            // src={ "https://buffer.com/library/content/images/2023/10/free-images.jpg" }
            title={`${imageTitle}`}
          />
          <img src={`${imageUrl}`} alt={ `${imageTitle}` } width={ styles.width } height={ styles.height * 0.66 } objectFit={ "contain" }/>

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              { header }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              { content }
            </Typography>
          </CardContent>

          <CardActions>
            {/* <Button size="small">Share</Button> */}
            <Button size="small">
              <Link to={ path }>
                Learn More
              </Link>
            </Button>
          </CardActions>
        </CardMediaContainer>
      </Card>
  );
}
