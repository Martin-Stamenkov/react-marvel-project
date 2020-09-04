import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import { Grid, Button } from '@material-ui/core';
import EventsCard from '../events-card/EventsCard';
import InfiniteScroll from 'react-infinite-scroller';

export default function EventsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const currentEvents = useSelector((state: any) => state.events?.results);
  const total = useSelector((state: any) => state.events?.total);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(fetchAllEvents(currentOffset));
  }, [currentOffset]);

  const onScroll = () => {
    setCurrentOffset(currentOffset + 20);
    currentEvents && setEvents(events.concat(currentEvents));
  };

  return (
    <>
      {/* {loading ? (
        <Callback />
      ) : ( */}
      <InfiniteScroll
        pageStart={0}
        loadMore={() => onScroll()}
        hasMore={total > currentOffset}
        threshold={500}
        loader={<Callback />}
      >
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
      </InfiniteScroll>
      {/* )} */}
    </>
  );
}
