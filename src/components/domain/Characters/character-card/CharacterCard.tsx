import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { history } from 'app/App';
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar, VariantType } from 'notistack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { TooltipCard } from 'libs/components/tooltip/tooltip';
import { GenericButton } from 'libs/components/button/generic-button';
import { Media } from 'libs/components/media/media';
import { IHero } from 'components/domain/characters/character-inferfaces/character-interfaces';
import {
  removeFavoriteCharacters,
  setFavoriteCharactersSuccess,
} from '../characters-action/character-action';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    boxShadow: '3px  3px  5px  grey',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    margin: 10,
  },
  bottom: {
    display: 'contents',
    justifyContent: 'space-between',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
type Props = {
  data: IHero;
};

function CharacterCard({ data }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const allCharacters = useSelector(
    (state: any) => state.charactersReducer.characters?.results
  );

  const searchedCharacters = useSelector(
    (state: any) => state.charactersReducer.searchedCharacters?.data.results
  );
  const favorites = useSelector(
    (state: any) => state.charactersReducer.favoriteCharacters
  );

  const { enqueueSnackbar } = useSnackbar();
  const character = useMemo(
    () =>
      (favorites && favorites.find((x: IHero) => x.id === data.id)) ||
      (searchedCharacters &&
        searchedCharacters.find((x: IHero) => x.id === data.id)) ||
      (allCharacters && allCharacters.find((x: IHero) => x.id === data.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchedCharacters, allCharacters]
  );

  useEffect(() => {
    character &&
    JSON.parse(localStorage.getItem('favoriteChars') || '[]').indexOf(
      character.id
    ) === -1
      ? setIsFavorite(false)
      : setIsFavorite(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToFavorites = useCallback((variant: VariantType) => {
    const favoritesCharacters = localStorage.getItem('favoriteChars')
      ? JSON.parse(localStorage.getItem('favoriteChars') || '[]')
      : [];
    if (character) {
      if (!favoritesCharacters.find((x: IHero) => x === character.id)) {
        favoritesCharacters.push(character.id);
        setIsFavorite(true);
        enqueueSnackbar('Added to favorites !', { variant });
      } else {
        favoritesCharacters.splice(
          favoritesCharacters.indexOf(character.id),
          1
        );
        dispatch(removeFavoriteCharacters(character.id));
        setIsFavorite(false);
        enqueueSnackbar('Removed from favorites !', { variant });
      }
    }
    localStorage.setItem('favoriteChars', JSON.stringify(favoritesCharacters));
    dispatch(setFavoriteCharactersSuccess());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    history.push(`/details/${character.id}`);
  };

  return (
    data && (
      <Grid className={classes.root} item>
        <Card className={classes.card}>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Media
              alt="avatar"
              image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
              title="avatar"
              style={{
                width: '100%',
                flexGrow: 2,
                objectFit: 'inherit',
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {data.name}
              </Typography>{' '}
              <>
                {data.description ? (
                  <TooltipCard title={data.description}>
                    <Typography
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.description}
                    </Typography>
                  </TooltipCard>
                ) : (
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="div"
                  >
                    <p>Missing Description!</p>
                    <p>See Details for more info.</p>
                  </Typography>
                )}
              </>
            </CardContent>
          </div>
          <CardActions className={classes.cardActions}>
            <Grid className={classes.bottom}>
              <GenericButton
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleClick()}
              >
                Details
              </GenericButton>

              <IconButton
                onClick={() =>
                  addToFavorites(!isFavorite ? 'success' : 'error')}
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
