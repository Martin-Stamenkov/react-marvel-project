import React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Backdrop,
} from '@material-ui/core';

type DialogProps = {
  title: string;
  description?: string;
  onClose?: () => void;
  open?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export const AlertDialog = (props: DialogProps) => {
  return (
    <Grid>
      <Backdrop open={props.open!!}>
        <Dialog
          onClose={props.onClose}
          aria-labelledby="simple-dialog-title"
          open={props.open!!}
        >
          <DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {props.description}
            </DialogContentText>
          </DialogContent>
        </Dialog>{' '}
      </Backdrop>
    </Grid>
  );
};
