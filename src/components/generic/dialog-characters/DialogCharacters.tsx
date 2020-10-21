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
import { AppearCharactersCard } from 'components/generic/appear-characters/ApearCharactersCard';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

export const DialogCharacters = ({ props }: any) => {
  const [open, setOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('body');

  const handleClick = (scrollType: DialogProps['scroll']) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!Object.keys(props).includes('comics')) {
      Requests.getCharactersByComicsId(props.id, publicKey, ts, hasher).then(
        (response) => {
          setCharacters(response.data.data.results);
        }
      );
    } else if (!Object.keys(props).includes('series')) {
      Requests.getCharactersBySeriesId(props.id, publicKey, ts, hasher).then(
        (response) => {
          setCharacters(response.data.data.results);
        }
      );
    } else if (!Object.keys(props).includes('events')) {
      Requests.getCharactersByEventId(props.id, publicKey, ts, hasher).then(
        (response) => {
          setCharacters(response.data.data.results);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {props.characters.items.length > 0 ? (
        <Typography gutterBottom variant="body1" color="textSecondary">
          <>
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
          <GridList cellHeight={160} cols={3}>
            {characters.map((character: any) => (
              <AppearCharactersCard key={character.id} data={character} />
            ))}
          </GridList>
        </DialogContent>
      </Dialog>
    </div>
  );
};
