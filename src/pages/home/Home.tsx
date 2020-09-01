import React, { useEffect } from 'react';
import { Modal, Backdrop, makeStyles, createStyles } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { history } from 'app/App';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
export const Home = () => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    history.push('/items');
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <ReactPlayer
          controls
          playing
          url="https://www.youtube.com/watch?v=mN_e5-fcGU4"
        />
      </Modal>
    </>
  );
};
