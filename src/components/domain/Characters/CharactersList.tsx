import React from 'react';
import { ItemModel } from 'types/ItemModel';
import CharacterCard from '.';
import { Requests } from 'api/requests';

type Props = {
  cards: ItemModel[];
};

function CharactersList() {
  return (
    <div>
      {/* {cards.map((card) =>(
              <CharacterCard key={card.id} data={card}></CharacterCard>
          ))} */}
    </div>
  );
}
export default CharactersList;
