// eslint-disable
import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CharacterCard from '..';
import { ItemModel } from 'types/types';
import {
  fetchAllCharactersRequest,
  fetchAllCharacters,
  fetchAllCharactersSuccess,
} from 'store/actions';

function CharactersList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.characters?.data.total);
  const allCharacters = useSelector(
    (state: any) => state.characters?.data.results
  );
  console.log(allCharacters);

  useEffect(() => {
    dispatch(fetchAllCharactersRequest());
    dispatch(fetchAllCharacters(currentOffset));
    // const newData = allCharacters && allCharacters;
    // newData && setCharacters((prevData: any) => prevData.concat(newData));
  }, [currentOffset]);

  return (
    <>
      <Grid container spacing={3} justify="center">
        {allCharacters &&
          allCharacters.map((card: ItemModel, index: number) => (
            <CharacterCard key={index} data={card} />
          ))}
      </Grid>
      <Grid
        container
        justify="space-between"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          borderTop: '1px solid lightgrey',
        }}
      >
        <Button
          disabled={currentOffset === 0}
          onClick={() => {
            return (
              setCurrentOffset(currentOffset - 20),
              window.scrollTo(0, 0),
              console.log(`fetch more! , offset is ${currentOffset}`)
            );
          }}
        >
          Previous Heroes
        </Button>
        <Button
          color="primary"
          variant={'contained'}
          disabled={currentOffset === total}
          onClick={() => {
            return (
              setCurrentOffset(currentOffset + 20),
              window.scrollTo(0, 0),
              console.log(`fetch more! , offset is ${currentOffset}`)
            );
          }}
        >
          More Heroes
        </Button>
      </Grid>
    </>
  );
}

export default CharactersList;
