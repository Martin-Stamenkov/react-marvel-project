import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComics } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import { Grid, Button, makeStyles } from '@material-ui/core';
import ComicsCard from '../comics-card/ComicsCard';
import InfiniteScroll from 'react-infinite-scroller';
const profileStyles = makeStyles({
  scroll: {
    display: 'inline-block',
    overflowY: 'scroll',
  },
});

export default function ComicsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const comics = useSelector((state: any) => state.comics?.results);
  const total = useSelector((state: any) => state.comics?.total);
  const [heroes, setHeroes] = useState<any>([]);
  const loading = useSelector((state: any) => state.loading);
  const classes = profileStyles();

  useEffect(() => {
    dispatch(fetchAllComics(currentOffset));
  }, [heroes, currentOffset]);

  const onScroll = () => {
    setCurrentOffset(currentOffset + 10);
    comics && setHeroes((prev: any) => [...prev, ...comics]);
  };
  console.log(heroes);

  return (
    <>
      {/* {loading ? (
        <Callback />
      ) : ( */}
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => onScroll()}
          hasMore={total > currentOffset}
          loader={<Callback />}
        >
          <Grid
            // className={classes.scroll}
            container
            spacing={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {heroes &&
              heroes.map((currentComics: any, index: number) => (
                <ComicsCard key={index} data={currentComics} />
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
            {/* <Button
                disabled={currentOffset === 0}
                onClick={() => {
                  return (
                    setCurrentOffset(currentOffset - 20), window.scrollTo(0, 0)
                  );
                }}
              >
                Previous Comics
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
                More Comics
              </Button> */}
          </Grid>
        </InfiniteScroll>
      </div>
      {/* )} */}
    </>
  );
}
