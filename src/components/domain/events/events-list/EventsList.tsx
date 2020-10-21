/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Callback } from 'components/generic/callback/Callback';
import { Grid, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import {
  fetchAllEvents,
  setEventsToNull,
} from '../events-actions/events-actions';
import EventsCard from '../events-card/EventsCard';

export default function EventsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const currentEvents = useSelector(
    (state: any) => state.eventsReducer.events?.results
  );
  const total = useSelector((state: any) => state.eventsReducer.events?.total);
  const offset = useSelector(
    (state: any) => state.eventsReducer.events?.offset
  );
  const loading = useSelector((state: any) => state.eventsReducer.loading);

  useEffect(() => {
    currentEvents && setEvents(events.concat(currentEvents));
  }, [currentEvents]);

  useEffect(() => {
    dispatch(fetchAllEvents(offset));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setEventsToNull(currentEvents));
    };
  }, []);

  const onScroll = () => {
    if (loading || offset === currentOffset) {
      return;
    }
    dispatch(fetchAllEvents(offset));
    setCurrentOffset(currentOffset + 20);
  };

  return (
    <>
      {currentOffset === 0 && loading ? (
        <Callback />
      ) : (
        <>
          <Typography
            style={{
              marginTop: '3%',
            }}
            variant="h4"
          >
            Discover the Events
          </Typography>

          <InfiniteScroll
            loadMore={() => onScroll()}
            hasMore={total > currentOffset}
            threshold={500}
            loader={
              <div key={0}>
                <Callback />
              </div>
            }
          >
            <Grid
              container
              spacing={5}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2%',
              }}
            >
              {events &&
                events.map((currentEvent: any, index: number) => (
                  <EventsCard key={currentEvent.id} data={currentEvent} />
                ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </>
  );
}
