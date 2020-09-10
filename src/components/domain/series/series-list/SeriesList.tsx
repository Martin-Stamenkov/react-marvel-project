import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Callback } from 'components/generic/callback/Callback';
import SeriesCard from 'components/domain/series/series-card/SeriesCard';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchAllSeries, setToNull } from 'store/actions';
import background from 'assets/11.png';

export const SeriesList = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [series, setSeries] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.series?.total);
  const currentSeries = useSelector((state: any) => state.series?.results);
  const offset = useSelector((state: any) => state.series?.offset);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentSeries && setSeries(series.concat(currentSeries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeries]);

  useEffect(() => {
    dispatch(fetchAllSeries(offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setToNull(currentSeries));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Grid
          style={{
            background: `url(${background}) no-repeat center fixed`,
            backgroundSize: '1380px 640px',
          }}
        >
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
                  <SeriesCard key={index} data={card} />
                ))}
            </Grid>
          </InfiniteScroll>
        </Grid>
      )}
    </>
  );
};
