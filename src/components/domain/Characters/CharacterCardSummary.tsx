import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridSpacing, Grid } from '@material-ui/core';
import CharactersList from './CharactersList';
import { ItemModel } from 'types/ItemModel';

type Props = {
  cards: ItemModel[];
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    marginTop: 100,
  },
});

function CharacterCardSummary({ cards }: Props) {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(3);

  return (
    <Grid className={classes.card} container justify="center" spacing={spacing}>
      <CharactersList></CharactersList>
    </Grid>
  );
}
export default CharacterCardSummary;
