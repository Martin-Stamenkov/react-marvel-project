import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { history } from 'app/App';
import { auth } from 'authentication/auth/Auth';
import { useSelector } from 'react-redux';
import { MenuDialog } from '../../components/layouts/dialog-menu/DialogMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const MenuAppBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openRight = Boolean(anchorEl);
  const userProfile = useSelector(
    (state: any) => state.userReducer.currentUser
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    auth.logout(history);
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    history.push('/profile');
  };

  return (
    <div className={classes.root}>
      <AppBar style={{ background: 'red' }} position="fixed">
        <Toolbar>
          {auth.isAuthenticated() ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            ''
          )}
          <MenuDialog open={open} onClose={handleDrawerClose} />
          <Typography variant="h6" className={classes.title}>
            Marvel Universe
          </Typography>
          <div style={{ display: 'flex' }}>
            <p style={{ fontSize: 'large' }}>
              {localStorage.getItem('access_token') &&
                userProfile &&
                `Hello ${userProfile.nickname}!`}
            </p>
            {auth.isAuthenticated() ? (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={openRight}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClick}>Profile</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </Menu>
              </>
            ) : (
              ''
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
