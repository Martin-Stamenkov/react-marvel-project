import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { history } from 'app/App';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: any;
  onClose: (value: string) => void;
}

export function MenuDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
    switch (value) {
      case 'Dashboard':
        history.push('/items');
        break;
      case 'Favorites':
        history.push('/favorites');
      default:
        break;
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Let`s adventure begin</DialogTitle>
      <List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText
              onClick={() => handleListItemClick('Dashboard')}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              onClick={() => handleListItemClick('Favorites')}
              primary="Favorites"
            />
          </ListItem>
        </List>
        <Divider />
      </List>
    </Dialog>
  );
}
