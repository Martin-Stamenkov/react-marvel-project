import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
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

  return (
    <Grid className={classes.card} container justify="center" spacing={3}>
      <CharactersList></CharactersList>
    </Grid>
  );
}
export default CharacterCardSummary;
