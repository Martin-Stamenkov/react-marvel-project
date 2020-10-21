import { makeStyles } from '@material-ui/core';

export const profileStyles = makeStyles({
  root: {
    minWidth: 100,
    marginTop: '10%',
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
      borderRadius: '50%',
    },
  },
});
