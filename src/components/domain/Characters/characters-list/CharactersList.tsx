/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { Callback } from 'components/generic/callback/Callback';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from 'libs/components/search-bar/SearchBar';
import CharacterCard from 'components/domain/characters/character-card/CharacterCard';
import {
  fetchAllCharacters,
  setCharactersToNull,
} from '../characters-action/character-action';
import { IHero } from '../character-inferfaces/character-interfaces';

const CharactersList = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [characters, setCharacters] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector(
    (state: any) => state.charactersReducer.characters?.total
  );
  const offset = useSelector(
    (state: any) => state.charactersReducer.characters?.offset
  );
  const currentCharacters = useSelector(
    (state: any) => state.charactersReducer.characters?.results
  );
  const loading = useSelector((state: any) => state.charactersReducer.loading);

  useEffect(() => {
    currentCharacters && setCharacters(characters.concat(currentCharacters));
  }, [currentCharacters]);

  useEffect(() => {
    dispatch(fetchAllCharacters(offset));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setCharactersToNull(currentCharacters));
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
        <Grid>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column-reverse',
            }}
          >
            <Typography variant="h4">Discover the Characters</Typography>
            <SearchBar />
          </div>
          <InfiniteScroll
            loadMore={() => onScroll()}
            hasMore={total > offset}
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
                marginTop: '2%',
              }}
            >
              {characters &&
                characters.map((card: IHero) => (
                  <CharacterCard key={card.id} data={card} />
                ))}
            </Grid>
          </InfiniteScroll>
        </Grid>
      )}
    </>
  );
};

export default CharactersList;
