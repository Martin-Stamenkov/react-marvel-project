import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { history } from 'app/App';
import ironMan from 'assets/iron-man.png';
import Comics from 'assets/comic.png';
import TvSeries from 'assets/television.png';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: any;
  onClose: (value: string) => void;
}
const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: '60%',
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export function MenuDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
    switch (value) {
      case 'Characters':
        history.push('/items');
        break;
      case 'Favorites':
        history.push('/favorites');
        break;
      case 'Comics':
        history.push('/comics');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle className={classes.title} id="simple-dialog-title">
          Let`s adventure begin
        </DialogTitle>
        <List>
          <Divider />
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText
                onClick={() => handleListItemClick('Characters')}
                primary="Characters"
              />
              <img style={{ height: 32 }} src={ironMan} />
            </ListItem>
            <ListItem button>
              <ListItemText
                onClick={() => handleListItemClick('Comics')}
                primary="Comics"
              />
              <img style={{ height: 32 }} src={Comics} />
            </ListItem>
            <ListItem button>
              <ListItemText
                onClick={() => handleListItemClick('Tv')}
                primary="Tv Series"
              />
              <img style={{ height: 32 }} src={TvSeries} />
            </ListItem>
            <ListItem button>
              <ListItemText
                onClick={() => handleListItemClick('Favorites')}
                primary="Favorites"
              />
              <FavoriteBorderIcon style={{ marginRight: 5 }} />
            </ListItem>
          </List>
          {/* <Divider /> */}
        </List>
      </Dialog>
    </>
  );
}
