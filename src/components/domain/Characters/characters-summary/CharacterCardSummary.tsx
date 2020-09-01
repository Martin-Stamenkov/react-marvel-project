import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import CharactersList from '../characters-list/CharactersList';
import SearchBar from 'components/layouts/search-bar/SearchBar';
import { useDispatch } from 'react-redux';
import { getUser } from 'store/actions';
import AuthContextProvider from 'authentication/Auth';

const auth = new AuthContextProvider();

export function CharacterCardSummary() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      auth.auth0.client.userInfo(
        localStorage.getItem('access_token') || '',
        (err: any, user: any) => {
          dispatch(getUser(user));
        }
      );
    }
  }, []);
  return (
    <Grid container justify="center" spacing={3}>
      <SearchBar />
      <CharactersList />
    </Grid>
  );
}
