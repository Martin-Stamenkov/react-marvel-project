import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GridSpacing, Grid } from '@material-ui/core';
import { ItemModel } from 'types/ItemModel';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    marginTop: 100,
  },
});
type Props = {
  data: ItemModel;
};

function CharacterCard() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);

  return (
    <Grid className={classes.card} container justify="center" spacing={spacing}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Loki"
            height="140"
            image="/static/images/cards/contemplative-Loki.jpg"
            title="Loki"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Loki
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Loki, Prince of Asgard, Odinson, rightful heir of Jotunheim, and
              God of Mischief, is burdened with glorious purpose. His desire to
              be a king drives him to sow chaos in Asgard. In his lust for
              power, he extends his reach to Earth
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Details
          </Button>
          <Button size="small" color="primary">
            Add to favorites
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default CharacterCard;
