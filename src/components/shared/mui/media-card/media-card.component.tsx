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
import { ReactNode } from "react";

interface MediaCardProps {
  styles: any;
  header: string;
  imageUrl: string;
  imageTitle: string;
  path: string;
  content: ReactNode | string
}

export default function MediaCard({ styles, header, imageUrl, imageTitle, path, content }: MediaCardProps) {
  const navigate = useNavigate()

  return (
    <Card sx={{ ...styles }} onClick={ () => navigate(path) }>
      <CardMedia
          // sx={{ height: styles.height }}
          // src={ "https://buffer.com/library/content/images/2023/10/free-images.jpg" }
          title={`${imageTitle}`}
        />
        <img src={`${imageUrl}`} alt={ `${imageTitle}` } width={ styles.width } height={ styles.height * 0.67 } 
          // objectFit={ "contain" }
        />
      <CardMediaContainer>
        <CardContent sx={{ height: styles.height }}>
          <Typography gutterBottom variant="h5" component="div">
            { header }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { content }
          </Typography>
        </CardContent>
      </CardMediaContainer>
    </Card>
  );
}
