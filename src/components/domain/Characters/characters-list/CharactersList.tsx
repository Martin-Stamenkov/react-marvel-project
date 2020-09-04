import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CharacterCard from '..';
import { ItemModel } from 'types/types';
import { fetchAllCharacters } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import InfiniteScroll from 'react-infinite-scroller';

function CharactersList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [characters, setCharacters] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.characters?.total);
  const currentCharacters = useSelector(
    (state: any) => state.characters?.results
  );
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(fetchAllCharacters(currentOffset));
  }, [currentOffset]);

  const onScroll = () => {
    setCurrentOffset(currentOffset + 20);
    currentCharacters && setCharacters(characters.concat(currentCharacters));
  };

  return (
    <>
      {/* {loading ? (
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
          <Grid container spacing={3} justify="center">
            {characters &&
              characters.map((card: ItemModel, index: number) => (
                <CharacterCard key={index} data={card} />
              ))}
          </Grid>
        </InfiniteScroll>
      </>
      {/* )} */}
    </>
  );
}

export default CharactersList;
