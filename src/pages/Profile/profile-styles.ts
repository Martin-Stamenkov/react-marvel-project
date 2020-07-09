import { makeStyles } from '@material-ui/core';

export const profileStyles = makeStyles({
  root: {
    marginTop: 100,
    minWidth: 100,
    minHeight: 450,
  },
  title: {
    fontSize: 16,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      width: 150,
      margin: 10,
    },
  },
});
