import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
  Grid,
  makeStyles,
  IconButton,
  createStyles,
  Theme,
  Collapse,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      maxWidth: 250,
    },
    root: {
      marginTop: 50,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  });
});

export default function ComicsCard({ data }: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Grid className={classes.root} item>
        <Card className={classes.card}>
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="center"
            >
              comics
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            alt="avatar"
            image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
            title="avatar"
          />
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph color="primary">
                {data.description ? data.description : 'Missing Description!'}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </>
  );
}
