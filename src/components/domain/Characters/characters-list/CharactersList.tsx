import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import CharacterCard from '..';
import { ItemModel } from 'types/types';
import { fetchAllCharacters, setToNull } from 'store/actions';
import { Callback } from 'components/generic/callback/Callback';
import InfiniteScroll from 'react-infinite-scroller';

function CharactersList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [characters, setCharacters] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.characters?.total);
  let offset = useSelector((state: any) => state.characters?.offset);
  const currentCharacters = useSelector(
    (state: any) => state.characters?.results
  );
  const loading = useSelector((state: any) => state.loading);
  console.log(offset);

  useEffect(() => {
    currentCharacters && setCharacters(characters.concat(currentCharacters));
  }, [currentCharacters]);

  useEffect(() => {
    dispatch(fetchAllCharacters(offset));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setToNull(currentCharacters));
    };
  }, []);

  const onScroll = () => {
    if (loading || offset === currentOffset) {
      return;
    }
    dispatch(fetchAllCharacters(offset));
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
            hasMore={total > offset}
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
      )}
    </>
  );
}

export default CharactersList;
