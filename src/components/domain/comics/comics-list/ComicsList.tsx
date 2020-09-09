import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComics } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import { Grid } from '@material-ui/core';
import ComicsCard from '../comics-card/ComicsCard';
import InfiniteScroll from 'react-infinite-scroller';

export default function ComicsList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const currentComics = useSelector((state: any) => state.comics?.results);
  const total = useSelector((state: any) => state.comics?.total);
  const offset = useSelector((state: any) => state.comics?.offset);
  const [comics, setComics] = useState([]);
  const loading = useSelector((state: any) => state.loading);
  console.log(offset);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await dispatch(fetchAllComics(currentOffset));
  };
  const onScroll = async () => {
    setCurrentOffset(currentOffset + 20);
    currentComics && setComics(comics.concat(currentComics));
  };

  return (
    <>
      {/* {offset === 0 && loading ? (
        <Callback />
      ) : ( */}
      <>
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
            {comics &&
              comics.map((currentComics: any, index: number) => (
                <ComicsCard key={index} data={currentComics} />
              ))}
          </Grid>
        </InfiniteScroll>
      </>
      {/* )} */}
    </>
  );
}
