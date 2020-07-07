import React from 'react';
import { ItemModel } from 'types/ItemModel';
import CharacterCard from '.';

type Props = {
    cards: ItemModel[]
}


function CharactersList({cards}: Props) {
  return (
      <div>      
          {/* {cards.map((card) =>(
              <CharacterCard key={card.id} data={card}></CharacterCard>
          ))} */}
      </div>
  );
};
export default CharactersList;