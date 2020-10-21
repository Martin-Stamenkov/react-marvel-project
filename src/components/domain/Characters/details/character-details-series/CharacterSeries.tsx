/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Callback } from 'components/generic/callback/Callback';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import { FloatingActionButton } from 'libs/components/floating-action-button/floating-action-button';
import { DetailsInfo } from '../details-info/DetailsInfo';
import { IDetails } from '../../character-inferfaces/character-interfaces';
import { Typography } from '@material-ui/core';

type Props = {
  id: number;
};

export const CharacterSeries = (props: Props) => {
  const [seriesRequests, setSeriesRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Requests.getSeriesByCharacterId(props.id, publicKey, ts, hasher)
      .then((response) => {
        setSeriesRequests(response.data.data.results);
      })
      .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FloatingActionButton />
      {loading ? (
        <Callback />
      ) : seriesRequests.length > 0 ? (
        seriesRequests.map((serie: IDetails) => (
          <DetailsInfo key={serie.id} data={serie} />
        ))
      ) : (
        <Typography
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          No Available Information. Check for Events or Comics
        </Typography>
      )}
    </>
  );
};
