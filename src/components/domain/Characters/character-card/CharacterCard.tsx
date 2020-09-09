import { fetchCharacterById, fetchCharacterByIdSuccess } from 'store/actions';
import { history } from 'app/App';
import {
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from '@material-ui/core';
import { ItemModel, ICard } from 'types/types';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSnackbar, VariantType } from 'notistack';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    boxShadow: '3px  3px  5px  grey',
  },
  root: {
    marginTop: 30,
  },
  bottom: {
    display: 'contents',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
});
type Props = {
  data: ItemModel;
};

function CharacterCard({ data }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const allCharacters = useSelector((state: any) => state.characters?.results);
  const searchedCharacters = useSelector(
    (state: any) => state.searchedCharacters?.data.results
  );
  const { enqueueSnackbar } = useSnackbar();
  const character = useMemo(
    () =>
      (searchedCharacters &&
        searchedCharacters.find((x: ICard) => x.id === data.id)) ||
      (allCharacters && allCharacters.find((x: ICard) => x.id === data.id)),
    []
  );

  useEffect(() => {
    character &&
    JSON.parse(localStorage.getItem('favoriteChars') || '[]').indexOf(
      character.id
    ) === -1
      ? setIsFavorite(false)
      : setIsFavorite(true);
  }, []);

  const addToFavorites = useCallback((variant: VariantType) => {
    const favoritesCharacters = localStorage.getItem('favoriteChars')
      ? JSON.parse(localStorage.getItem('favoriteChars') || '[]')
      : [];
    if (character) {
      if (!favoritesCharacters.find((x: ICard) => x === character.id)) {
        favoritesCharacters.push(character.id);
        setIsFavorite(true);
        enqueueSnackbar('Added to favorites !', { variant });
      } else {
        favoritesCharacters.splice(
          favoritesCharacters.indexOf(character.id),
          1
        );
        setIsFavorite(false);
        enqueueSnackbar('Removed from favorites !', { variant });
      }
    }
    localStorage.setItem('favoriteChars', JSON.stringify(favoritesCharacters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    dispatch(fetchCharacterByIdSuccess(character));
    character && dispatch(fetchCharacterById(character.id));
    history.push('/details');
  };

  return (
    data && (
      <Grid className={classes.root} item>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            alt="avatar"
            image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
            title="avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {data.name}
            </Typography>{' '}
            {data.description ? (
              <Typography variant="body2" color="textSecondary" component="p">
                {data.description}
              </Typography>
            ) : (
              <Typography variant="body1" color="textSecondary" component="div">
                <p>Missing Description!</p>
                <p>See Details for more info.</p>
              </Typography>
            )}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Grid className={classes.bottom}>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleClick()}
              >
                Details
              </Button>

              <IconButton
                onClick={() =>
                  addToFavorites(!isFavorite ? 'success' : 'error')
                }
                aria-label="add to favorites"
              >
                <FavoriteIcon color={isFavorite ? 'secondary' : 'inherit'} />
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    )
  );
}
export default CharacterCard;
