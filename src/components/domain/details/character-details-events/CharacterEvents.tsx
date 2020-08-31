import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Requests } from '../../../../api/requests';
import { publicKey, ts, hasher } from '../../../../api/constants';
import { Callback } from 'components/generic/callback/Callback';
import { DetailsInfo } from '../../details/details-info/DetailsInfo';

export const CharacterEvents = () => {
  const [eventsRequests, setEventsRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const characterDetails = useSelector((state: any) => state.character);

  useEffect(() => {
    characterDetails &&
      Requests.getEventsByCharacterId(
        characterDetails.id,
        publicKey,
        ts,
        hasher
      )
        .then((response) => {
          setEventsRequests(response.data.data.results);
        })
        .then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(eventsRequests);

  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        eventsRequests &&
        eventsRequests.map((event: any) => (
          <DetailsInfo key={event.id} data={event} />
        ))
      )}
    </>
  );
};