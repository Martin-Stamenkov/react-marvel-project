import React, { useEffect, useState } from 'react';
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
import Events from 'assets/events.png';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: string;
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
  const [isClicked, setIsClicked] = useState('');
  const [locationKeys, setLocationKeys] = useState<string[]>([]);
  const classes = useStyles();

  const handleClose = () => {
    onClose(selectedValue!!);
  };

  const capitalize = (value: string) => {
    return value.substring(1).charAt(0).toUpperCase() + value.slice(2);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
    switch (value) {
      case 'Characters':
        setIsClicked('Characters');
        history.push('/items');
        break;
      case 'Favorites':
        setIsClicked('Favorites');
        history.push('/favorites');
        break;
      case 'Comics':
        setIsClicked('Comics');
        history.push('/comics');
        break;
      case 'Series':
        setIsClicked('Series');
        history.push('/series');
        break;
      case 'Events':
        setIsClicked('Events');
        history.push('/events');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    return () => {
      if (history.location.pathname === '/profile') {
        setIsClicked('');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);

  useEffect(() => {
    const checkForLocation = () => {
      if (capitalize(history.location.pathname) === 'Items') {
        setIsClicked('Characters');
      } else {
        setIsClicked(capitalize(history.location.pathname));
      }
    };

    return history.listen((location) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key!]);
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          checkForLocation();
        } else {
          setLocationKeys((keys: any) => [location.key, ...keys]);
          checkForLocation();
        }
      }
    });
  }, [locationKeys]);

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
            <ListItem selected={isClicked === 'Characters'} button>
              <ListItemText
                onClick={() => handleListItemClick('Characters')}
                primary="Characters"
              />
              <img style={{ height: 32 }} src={ironMan} alt="ironMan" />
            </ListItem>
            <ListItem selected={isClicked === 'Comics'} button>
              <ListItemText
                onClick={() => handleListItemClick('Comics')}
                primary="Comics"
              />
              <img style={{ height: 32 }} src={Comics} alt="Comics" />
            </ListItem>
            <ListItem selected={isClicked === 'Series'} button>
              <ListItemText
                onClick={() => handleListItemClick('Series')}
                primary="Tv Series"
              />
              <img style={{ height: 32 }} src={TvSeries} alt="TV Series" />
            </ListItem>
            <ListItem selected={isClicked === 'Events'} button>
              <ListItemText
                onClick={() => handleListItemClick('Events')}
                primary="Events"
              />
              <img style={{ height: 32 }} src={Events} alt="Events" />
            </ListItem>
            <ListItem selected={isClicked === 'Favorites'} button>
              <ListItemText
                onClick={() => handleListItemClick('Favorites')}
                primary="Favorites"
              />
              <FavoriteBorderIcon style={{ marginRight: 5 }} />
            </ListItem>
          </List>
        </List>
      </Dialog>
    </>
  );
}
