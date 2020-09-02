import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import { Grid, Button } from '@material-ui/core';
import EventsCard from '../events-card/EventsCard';

export default function EventsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const events = useSelector((state: any) => state.events?.results);
  const total = useSelector((state: any) => state.events?.total);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(fetchAllEvents(currentOffset));
  }, [currentOffset]);
  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        <>
          <Grid
            container
            spacing={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {events &&
              events.map((currentEvent: any, index: number) => (
                <EventsCard key={index} data={currentEvent} />
              ))}
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              borderTop: '1px solid lightgrey',
            }}
          >
            <Button
              disabled={currentOffset === 0}
              onClick={() => {
                return (
                  setCurrentOffset(currentOffset - 20), window.scrollTo(0, 0)
                );
              }}
            >
              Previous Events
            </Button>
            <Button
              color="primary"
              variant={'contained'}
              disabled={currentOffset === total}
              onClick={() => {
                return (
                  setCurrentOffset(currentOffset + 20), window.scrollTo(0, 0)
                );
              }}
            >
              More Events
            </Button>
          </Grid>
        </>
      )}
    </>
  );
}
