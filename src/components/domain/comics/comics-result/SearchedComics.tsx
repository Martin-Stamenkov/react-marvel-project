import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import SearchBar from 'components/layouts/search-bar/SearchBar';
import NotFoundPage from 'pages/Not-Found/not-found';
import { Callback } from 'components/generic/callback/Callback';
import ComicsCard from '../comics-card/ComicsCard';

export default function SearchedComics() {
  const comics = useSelector(
    (state: any) => state.searchedComics?.data.results
  );
  const loading = useSelector((state: any) => state.loading);
  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        <>
          {comics && comics.length > 0 ? (
            <Grid container justify="center" spacing={3}>
              <SearchBar />
              <Grid container spacing={5} justify="center">
                {comics &&
                  comics.map((comics: any) => (
                    <ComicsCard key={comics.id} data={comics} />
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
}
