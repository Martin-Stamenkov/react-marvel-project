import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import SearchBar from 'libs/components/search-bar/SearchBar';
import { NotFoundPage } from 'pages/Not-Found/not-found';
import { Callback } from 'components/generic/callback/Callback';
import { useDispatch, useSelector } from 'react-redux';
import CharacterCard from 'components/domain/characters/character-card/CharacterCard';
import { useHistory } from 'react-router-dom';
import { searchCharactersByName } from 'components/domain/characters/characters-action/character-action';

export const SearchedCharacters = () => {
  const searchedCharacters = useSelector(
    (state: any) => state.charactersReducer.searchedCharacters?.data.results
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: any) => state.charactersReducer.loading);

  useEffect(() => {
    const characterName = history.location.pathname.substring(
      history.location.pathname.lastIndexOf('/') + 1
    );
    dispatch(searchCharactersByName(characterName));
  }, [dispatch, history.location.pathname]);

  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        <>
          {searchedCharacters && searchedCharacters.length > 0 ? (
            <Grid container justify="center" spacing={3}>
              <SearchBar />
              <Grid
                container
                style={{ margin: 0 }}
                spacing={5}
                justify="center"
              >
                {searchedCharacters &&
                  searchedCharacters.map((character: any) => (
                    <CharacterCard key={character.id} data={character} />
                  ))}
              </Grid>
            </Grid>
          ) : (
            <NotFoundPage />
          )}
        </>
      )}
    </>
  );
};
