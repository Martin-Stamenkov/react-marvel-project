/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Callback } from 'components/generic/callback/Callback';
import { Grid, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import ComicsCard from '../comics-card/ComicsCard';
import {
  fetchAllComics,
  setComicsToNull,
} from '../comics-actions/comics-actions';
import { IComics } from '../comics-interfaces/comics-interfaces';

export const ComicsList = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const currentComics = useSelector(
    (state: any) => state.comicsReducer.comics?.results
  );
  const total = useSelector((state: any) => state.comicsReducer.comics?.total);
  const offset = useSelector(
    (state: any) => state.comicsReducer.comics?.offset
  );
  const [comics, setComics] = useState([]);
  const loading = useSelector((state: any) => state.comicsReducer.loading);

  useEffect(() => {
    currentComics && setComics(comics.concat(currentComics));
  }, [currentComics]);

  useEffect(() => {
    dispatch(fetchAllComics(offset));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setComicsToNull(currentComics));
    };
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
          <Typography
            style={{
              marginTop: '3%',
            }}
            variant="h4"
          >
            Discover the Comics
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
              spacing={4}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2%',
              }}
            >
              {comics &&
                comics.map((comic: IComics) => (
                  <ComicsCard key={comic.id} data={comic} />
                ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};
