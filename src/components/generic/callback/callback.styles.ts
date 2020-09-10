import { makeStyles } from '@material-ui/core';
import background from 'assets/4.jpg';

export const SpinnerStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '20vh',
    '& p': {
      padding: 10,
      fontFamily: '"Arial Black", Gadget, sans-serif',
    },
  },
});
