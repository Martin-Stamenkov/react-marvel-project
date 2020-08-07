import React from 'react';
import { Button } from '@material-ui/core';

interface IButton {
  onClick: () => void;
}

export default function FavoriteButton({ onClick }: IButton) {
  const isFavoriteCharacter = (id: number) => {
    return localStorage.getItem('favoriteChars')?.indexOf(id.toString()) !== -1;
  };

  const isFavorite = isFavoriteCharacter;
  const name = !isFavorite ? 'Add to Favorites' : 'Remove from Favorites';
  return (
    <div>
      <Button onClick={onClick}>{name}</Button>
    </div>
  );
}
