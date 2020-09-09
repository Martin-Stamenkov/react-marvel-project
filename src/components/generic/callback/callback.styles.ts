import { makeStyles } from '@material-ui/core';

export const SpinnerStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '10vh',

    '& p': {
      padding: 10,
      fontFamily: '"Arial Black", Gadget, sans-serif',
    },
  },
});
