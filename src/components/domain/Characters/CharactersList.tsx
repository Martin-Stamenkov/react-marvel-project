import React, { useState } from 'react';
import CharacterCard from '.';
import { createItems } from 'mocks/ItemMocks';
import { Grid } from '@material-ui/core';
import { useInfiniteScroll } from 'react-infinite-scroll-hook';
import PropTypes from 'prop-types';

// type Props = {
//   cards: ItemModel[];
// };

function CharactersList({ scrollContainer }: any) {
  const mockedData = createItems(64);
  const perPage = 8;
  const [loadedItems, setLoadedItems] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const loadItems = (prevArray = [], startCursor = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let newArray: any = prevArray;

        for (let i = startCursor; i < startCursor + perPage; i++) {
          if (startCursor === mockedData.length) {
            return;
          }
          const newItem = {
            key: i,
            value: mockedData[i],
          };
          newArray = [...newArray, newItem];
        }
        console.log(newArray);

        resolve(newArray);
      }, 1000);
    });
  };

  const handleLoadMore = () => {
    setLoading(true);
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
        {loadedItems.map((card: any, index: number) => (
          <CharacterCard key={index} data={card.value} />
        ))}
      </Grid>
    </>
  );
}
CharactersList.prototype = {
  scrollContainer: PropTypes.oneOf(['window', 'parent']),
};
export default CharactersList;
