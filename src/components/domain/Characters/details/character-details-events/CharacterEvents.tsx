/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Callback } from 'components/generic/callback/Callback';
import { FloatingActionButton } from 'libs/components/floating-action-button/floating-action-button';
import { Requests } from '../../../../../api/requests';
import { publicKey, ts, hasher } from '../../../../../api/constants';
import { DetailsInfo } from '../details-info/DetailsInfo';
import { IDetails } from '../../character-inferfaces/character-interfaces';
import { Typography } from '@material-ui/core';

type Props = {
  id: number;
};

export const CharacterEvents = (props: Props) => {
  const [eventsRequests, setEventsRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Requests.getEventsByCharacterId(props.id, publicKey, ts, hasher)
      .then((response) => {
        setEventsRequests(response.data.data.results);
      })
      .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FloatingActionButton />
      {loading ? (
        <Callback />
      ) : eventsRequests.length > 0 ? (
        eventsRequests.map((event: IDetails) => (
          <DetailsInfo key={event.id} data={event} />
        ))
      ) : (
        <Typography
          style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
        >
          No Available Information. Check for Comics or Series
        </Typography>
      )}
    </>
  );
};
