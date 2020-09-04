import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { fetchAllSeries } from '../../../../store/actions';
import { Callback } from 'components/generic/callback/Callback';
import SeriesCard from 'components/domain/series/series-card/SeriesCard';
import InfiniteScroll from 'react-infinite-scroller';

export const SeriesList = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [series, setSeries] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.series?.total);
  const currentSeries = useSelector((state: any) => state.series?.results);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(fetchAllSeries(currentOffset));
  }, [currentOffset]);

  const onScroll = () => {
    setCurrentOffset(currentOffset + 20);
    currentSeries && setSeries(series.concat(currentSeries));
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
        {' '}
        <Grid container spacing={3} justify="center">
          {series &&
            series.map((card: any, index: number) => (
              <SeriesCard key={index} data={card} />
            ))}
        </Grid>
      </InfiniteScroll>

      {/* )} */}
    </>
  );
};
