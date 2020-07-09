import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { ItemModel } from 'types/ItemModel';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height: '100%',
  },
  card: {
    marginTop: 100,
  },
});
type Props = {
  data: ItemModel;
};

function CharacterCard({ data }: Props) {
  const classes = useStyles();
  const [isAdded, setIsAdded] = useState(false);

  function addToFavorites() {
    if (!isAdded) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }

  return (
    <Grid className={classes.card} item justify="center">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="avatar"
            image={data.avatar}
            title="avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Details
          </Button>
          <Button size="small" color="primary" onClick={() => addToFavorites()}>
            {!isAdded ? 'Add to favorites' : 'Remove from favorites'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default CharacterCard;
