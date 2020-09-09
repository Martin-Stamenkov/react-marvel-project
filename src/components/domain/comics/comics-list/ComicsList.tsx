import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComics, setToNull } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import { Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import ComicsCard from '../comics-card/ComicsCard';

export default function ComicsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const currentComics = useSelector((state: any) => state.comics?.results);
  const total = useSelector((state: any) => state.comics?.total);
  const offset = useSelector((state: any) => state.comics?.offset);
  const [comics, setComics] = useState([]);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentComics && setComics(comics.concat(currentComics));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentComics]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(fetchAllComics(offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setToNull(currentComics));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = () => {
    if (loading || offset === currentOffset) {
      return;
    }
    dispatch(fetchAllComics(offset));
    setCurrentOffset(currentOffset + 20);
  };

  return (
    <>
      {currentOffset === 0 && loading ? (
        <Callback />
      ) : (
        <>
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
              {comics &&
                comics.map((currentComics: any, index: number) => (
                  <ComicsCard key={index} data={currentComics} />
                ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </>
  );
}
