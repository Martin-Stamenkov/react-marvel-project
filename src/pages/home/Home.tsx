import React, { useEffect } from 'react';
import {
  Modal,
  Backdrop,
  makeStyles,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import ReactPlayer from 'react-player';
import { history } from 'app/App';
import { auth } from 'authentication/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'authentication/user/user-actions';
import { GenericButton } from 'libs/components/button/generic-button';

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-around',
    },
  })
);

export const Home = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userReducer.currentUser);
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

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>
            {user && (
              <Typography>
                {`Welcome ${user.nickname} would you like see the intro?`}
              </Typography>
            )}
          </DialogTitle>
          <div className={classes.buttons}>
            <DialogActions>
              <GenericButton
                color="primary"
                size="large"
                variant="outlined"
                onClick={() => handleClose()}
              >
                Skip Intro
              </GenericButton>
            </DialogActions>
            <DialogActions>
              <GenericButton
                color="inherit"
                size="large"
                variant="outlined"
                onClick={() => handleOpen()}
              >
                See Intro
              </GenericButton>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
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
