import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Requests } from '../../../../api/requests';
import { publicKey, ts, hasher } from '../../../../api/constants';
import { Callback } from 'components/generic/callback/Callback';
import { Grid } from '@material-ui/core';
import { EventsCard } from 'components/domain/events/events-card/EventsCard';

export const CharacterEvents = () => {
  const [eventsRequests, setEventsRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const characterDetails = useSelector((state: any) => state.character);

  useEffect(() => {
    characterDetails &&
      // characterDetails.comics.items.forEach((currentComics: any) => {
      //   const comicsId = currentComics.resourceURI.slice(-5);
      Requests.getEventsByCharacterId(
        characterDetails.id,
        publicKey,
        ts,
        hasher
      )
        .then((response) => {
          console.log(response);
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
        // <Grid container>
        eventsRequests &&
        eventsRequests.map((currentComics: any) => (
          <EventsCard key={currentComics.id} data={currentComics} />
        ))
        // </Grid>
      )}
    </>
  );
};
