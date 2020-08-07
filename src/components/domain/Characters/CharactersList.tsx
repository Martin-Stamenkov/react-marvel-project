// eslint-disable
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CharacterCard from '.';
import { ItemModel } from 'types/types';

function CharactersList({ scrollContainer }: any) {
  const perPage = 4;
  const [loadedItems, setLoadedItems] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const allCharacters = useSelector(
    (state: any) => state.characters?.data.results
  );
  // const offset = useSelector((state: any) => state.characters.data.offset);
  // const [characters, setCharacters] = useState<any>([]);
  // setCharacters(allCharacters);

  const loadItems = (prevArray = [], startCursor = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // debugger;
        let newArray: any = prevArray;
        for (let i = startCursor; i < startCursor + perPage; i++) {
          // if (startCursor === loadedItems.length) {
          //   return;
          // }
          const newItem = {
            key: i,
            value: newArray[i],
          };
          newArray = [...newArray, newItem];
        }

        resolve(newArray);
      }, 1000);
    });
  };

  const handleLoadMore = () => {
    loadItems(loadedItems, loadedItems.length).then((newArray) => {
      setLoading(false);
      setLoadedItems(newArray);
    });
  };

  const infiniteRef = useInfiniteScroll({
    loading,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: true,
    threshold: 200,
    onLoadMore: handleLoadMore,
    scrollContainer,
  });

  return (
    <>
      <Grid innerRef={infiniteRef} container spacing={3} justify="center">
        {allCharacters &&
          allCharacters.map((card: ItemModel, index: number) => (
            <CharacterCard key={index} data={card} />
          ))}
      </Grid>
    </>
  );
}
CharactersList.prototype = {
  scrollContainer: PropTypes.oneOf(['window', 'parent']),
};
export default CharactersList;
