import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CharacterCard from '..';
import SearchBar from 'components/layouts/search-bar/SearchBar';

export default function SearchedCharacters() {
  const characters = useSelector(
    (state: any) => state.searchedCharacters?.data.results
  );
  return (
    <>
      <Grid container justify="center" spacing={3}>
        <SearchBar />
        <Grid container spacing={5} justify="center">
          {characters &&
            characters.map((character: any) => (
              <CharacterCard key={character.id} data={character} />
            ))}
        </Grid>
      </Grid>
    </>
  );
}
