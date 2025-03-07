import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
export default function MediaCard({ posts }) {
  console.log(posts);
  if (posts) {
    return (
      <Card sx={{ maxWidth: '260px', width: '100%', cursor: 'pointer' }}>
        <>
          <img
            className="imgPost"
            style={{
              height: '250px',
              overflow: 'hidden',
              width: '100%',
              objectFit: 'cover',
            }}
            src={posts.images && posts.images[0].src}
            alt="Leão"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {posts.post_title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {posts.post_content}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              px: 2.5,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <ShareIcon sx={{ color: '#64b5f6', fontSize: 15 }}></ShareIcon>
            <NavLink to={`posts/${posts.post_name}`}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AddIcon sx={{ color: '#64b5f6' }}></AddIcon>
                <Button
                  sx={{ display: 'block', color: '#64b5f6' }}
                  size="small"
                >
                  Ler mais
                </Button>
              </Box>
            </NavLink>
          </CardActions>
        </>
      </Card>
    );
  }
}
