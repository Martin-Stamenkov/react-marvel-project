/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import { Callback } from 'components/generic/callback/Callback';
import { Typography } from '@material-ui/core';
import { FloatingActionButton } from 'libs/components/floating-action-button/floating-action-button';
import { DetailsInfo } from '../details-info/DetailsInfo';
import { IDetails } from '../../character-inferfaces/character-interfaces';

type Props = {
  id: number;
};

export const CharactersComics = (props: Props) => {
  const [comicsRequests, setComicsRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Requests.getComicsByCharacterId(props.id, publicKey, ts, hasher)
      .then((response) => {
        setComicsRequests(response.data.data.results);
      })
      .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  return (
    <>
      <FloatingActionButton />
      {loading ? (
        <Callback />
      ) : comicsRequests.length > 0 ? (
        comicsRequests.map((currentComics: IDetails) => (
          <DetailsInfo key={currentComics.id} data={currentComics} />
        ))
      ) : (
        <Typography
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          No Available Information. Check for Events or Series
        </Typography>
      )}
    </>
  );
};
