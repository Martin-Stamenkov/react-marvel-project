import React, { useState, useEffect } from 'react';
import { Requests } from 'api/requests';
import { useSelector } from 'react-redux';
import { publicKey, ts, hasher } from 'api/constants';
import ComicsCard from 'components/domain/comics/comics-card/ComicsCard';
import { Grid } from '@material-ui/core';
import { Callback } from 'components/generic/callback/Callback';

export const CharactersComics = () => {
  const [comicsRequests, setComicsRequests] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const characterDetails = useSelector((state: any) => state.character);

  useEffect(() => {
    characterDetails &&
      characterDetails.comics.items.forEach((currentComics: any) => {
        const comicsId = currentComics.resourceURI.slice(-5);
        Requests.getComicsById(comicsId, publicKey, ts, hasher)
          .then((response) => {
            setComicsRequests((result: any) => [
              ...result,
              response.data.data.results[0],
            ]);
          })
          .then(() => setLoading(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        <Grid container spacing={5} justify="center">
          {comicsRequests &&
            comicsRequests.map((currentComics: any) => (
              <ComicsCard key={currentComics.id} data={currentComics} />
            ))}
        </Grid>
      )}
    </>
  );
};
