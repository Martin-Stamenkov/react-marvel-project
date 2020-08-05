import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { ItemModel, ICard } from 'types/types';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCharacterByIdRequest,
  fetchCharacterById,
  fetchCharacterByIdSuccess,
} from 'store/actions';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  },
  root: {
    marginTop: 100,
  },
});
type Props = {
  data: ItemModel;
};
// eslint-disable

function CharacterCard({ data }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allCharacters = useSelector(
    (state: any) => state.characters?.data.results
  );
  const [isAdded, setIsAdded] = useState(false);

  const favoritesCharacters = localStorage.getItem('favoriteChars')
    ? JSON.parse(localStorage.getItem('favoriteChars') || '')
    : [];
  // const [favoritesCharacters, setFavoriteCharacters] = useState<any>([]);

  const addToFavorites = useCallback(() => {
    const character =
      allCharacters && allCharacters.find((x: ICard) => x.id === data.id);
    if (!favoritesCharacters.find((x: ICard) => x.id === character.id)) {
      // setFavoriteCharacters((result: any) => [...result, character]);
      favoritesCharacters.push(character.id);
    }
    localStorage.setItem('favoriteChars', JSON.stringify(favoritesCharacters));
    const temp = localStorage.getItem('favoriteChars');
    console.log(temp);
    // console.log(favoritesCharacters);
  }, []);
  localStorage.clear();

  const handleClick = () => {
    const character =
      allCharacters && allCharacters.find((x: ICard) => x.id === data.id);
    dispatch(fetchCharacterByIdRequest());
    dispatch(fetchCharacterByIdSuccess(character));
    dispatch(fetchCharacterById(character.id));
  };
  return (
    data && (
      <Grid className={classes.root} item>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="avatar"
              image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
              title="avatar"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {data.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleClick()}>
              Details
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => addToFavorites()}
            >
              {!data.addToFavorites
                ? 'Add to favorites'
                : 'Remove from favorites'}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  );
}
export default CharacterCard;
