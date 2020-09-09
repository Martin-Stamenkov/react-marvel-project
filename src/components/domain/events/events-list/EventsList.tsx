import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents, setToNull } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import { Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import EventsCard from '../events-card/EventsCard';

export default function EventsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const currentEvents = useSelector((state: any) => state.events?.results);
  const total = useSelector((state: any) => state.events?.total);
  const offset = useSelector((state: any) => state.events?.offset);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentEvents && setEvents(events.concat(currentEvents));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEvents]);

  useEffect(() => {
    dispatch(fetchAllEvents(offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setToNull(currentEvents));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            spacing={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {events &&
              events.map((currentEvent: any, index: number) => (
                <EventsCard key={index} data={currentEvent} />
              ))}
          </Grid>
        </InfiniteScroll>
      )}
    </>
  );
}
