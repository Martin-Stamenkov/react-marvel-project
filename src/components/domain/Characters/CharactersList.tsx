import React from 'react';
import { ItemModel } from 'types/ItemModel';
import CharacterCard from '.';
import { Requests } from 'api/requests';
import { createItems } from 'mocks/ItemMocks';
import { Grid } from '@material-ui/core';

// type Props = {
//   cards: ItemModel[];
// };

function CharactersList() {
  const mockedData = createItems(20);

  return (
    <div>
      <Grid container spacing={3} justify="center">
        {mockedData.map((card, index) => (
          <CharacterCard key={index} data={card}></CharacterCard>
        ))}
        {console.log(mockedData)}
      </Grid>
    </div>
  );
}
export default CharactersList;
