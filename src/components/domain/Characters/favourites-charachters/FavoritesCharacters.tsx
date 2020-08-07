import React, { useState, useEffect } from 'react';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import CharacterCard from '../CharacterCard';
import { Grid } from '@material-ui/core';

export const FavoritesCharacters = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<any>([]);
  const favorites = JSON.parse(localStorage.getItem('favoriteChars') || '');

  useEffect(() => {
    favorites.forEach((favoriteId: number) => {
      Requests.getCharacterById(favoriteId, publicKey, ts, hasher).then(
        (response) => {
          setFavoriteCharacters((result: any) => [
            ...result,
            response.data.data.results[0],
          ]);
        }
      );
    });
  }, []);
  return (
    <>
      <Grid container spacing={5} justify="center">
        {favoriteCharacters &&
          favoriteCharacters.map((character: any) => (
            <CharacterCard key={character.id} data={character} />
          ))}
      </Grid>
    </>
  );
};
