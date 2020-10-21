/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { Callback } from 'components/generic/callback/Callback';
import SeriesCard from 'components/domain/series/series-card/SeriesCard';
import InfiniteScroll from 'react-infinite-scroller';
import {
  fetchAllSeries,
  setSeriesToNull,
} from '../series-actions/series-actions';

export const SeriesList = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [series, setSeries] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.seriesReducer.series?.total);
  const currentSeries = useSelector(
    (state: any) => state.seriesReducer.series?.results
  );
  const offset = useSelector(
    (state: any) => state.seriesReducer.series?.offset
  );
  const loading = useSelector((state: any) => state.seriesReducer.loading);

  useEffect(() => {
    currentSeries && setSeries(series.concat(currentSeries));
  }, [currentSeries]);

  useEffect(() => {
    dispatch(fetchAllSeries(offset));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setSeriesToNull(currentSeries));
    };
  }, []);

  const onScroll = () => {
    if (loading || offset === currentOffset) {
      return;
    }
    dispatch(fetchAllSeries(offset));
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
            Discover the Tv Series
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
              spacing={3}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '5%',
              }}
            >
              {series &&
                series.map((card: any, index: number) => (
                  <SeriesCard key={card.id} data={card} />
                ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};
