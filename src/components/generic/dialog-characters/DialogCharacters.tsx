import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  GridList,
  Typography,
  DialogProps,
} from '@material-ui/core';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import { ComicsCharacters } from 'components/generic/appear-characters/ApearCharactersCard';
import { useSelector } from 'react-redux';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

export const DialogCharacters = ({ props }: any) => {
  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const currentComics = useSelector((state: any) => state.currentComics);
  const currentSeries = useSelector((state: any) => state.currentSeries);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('body');
  console.log(currentSeries);

  const handleClick = (scrollType: DialogProps['scroll']) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(props);
  useEffect(() => {
    if (currentComics && !Object.keys(props).includes('comics')) {
      Requests.getCharactersByComicsId(
        currentComics.id,
        publicKey,
        ts,
        hasher
      ).then((response) => {
        setCharacters(response.data.data.results);
      });
    } else if (currentSeries && !Object.keys(props).includes('series')) {
      Requests.getCharactersBySeriesId(
        currentSeries.id,
        publicKey,
        ts,
        hasher
      ).then((response) => {
        console.log(response);
        setCharacters(response.data.data.results);
      });
    }
  }, []);

  console.log(characters);
  return (
    <div>
      {props.characters.items.length > 0 ? (
        <Typography gutterBottom variant="body1" color="textSecondary">
          <>
            {' '}
            <span>See characters </span>
          </>
          <IconButton onClick={() => handleClick('body')}>
            <NavigateNextIcon fontSize="small" />
          </IconButton>
        </Typography>
      ) : (
        <Typography gutterBottom variant="body1" color="error">
          No available information about characters
        </Typography>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle id="scroll-dialog-title">Characters</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseSharpIcon />
          </IconButton>
        </div>
        <DialogContent dividers={scroll === 'paper'}>
          <GridList cellHeight={160} cols={2}>
            {characters.map((character: any) => (
              <ComicsCharacters key={character.id} data={character} />
            ))}
          </GridList>
        </DialogContent>
      </Dialog>
    </div>
  );
};
