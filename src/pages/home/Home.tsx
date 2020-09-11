import React, { useEffect } from 'react';
import { Modal, Backdrop, makeStyles, createStyles } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { history } from 'app/App';
import AuthContextProvider from 'authentication/Auth';
import { useDispatch } from 'react-redux';
import { getUser } from 'store/actions';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
const auth = new AuthContextProvider();

export const Home = () => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      auth.auth0.client.userInfo(
        localStorage.getItem('access_token') || '',
        (err: any, user: any) => {
          dispatch(getUser(user));
        }
      );
    }
  }, [dispatch]);

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
          playing
          url="https://www.youtube.com/watch?v=mN_e5-fcGU4"
          width="90%"
          height="90%"
        />
      </Modal>
    </>
  );
};
