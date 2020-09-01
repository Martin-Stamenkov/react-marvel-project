import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  IconButton,
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  GridList,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Requests } from 'api/requests';
import { publicKey, ts, hasher } from 'api/constants';
import { ComicsCharacters } from '../comics-characters/ComicsCharacters';

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    marginLeft: 22,
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
  },
  divider: {
    marginBottom: 20,
  },
});
export const ComicsInfo = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [creators, setCreators] = useState<any>([]);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [characters, setCharacters] = useState([]);
  const currentComics = useSelector((state: any) => state.currentComics);

  const handleClick = (scrollType: DialogProps['scroll']) => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    Requests.getCreatorsByComicsId(
      currentComics.id,
      publicKey,
      ts,
      hasher
    ).then((response) => {
      console.log(response.data.data.results);

      setCreators(response.data.data.results);
    });
  }, []);

  useEffect(() => {
    Requests.getCharactersByComicsId(
      currentComics.id,
      publicKey,
      ts,
      hasher
    ).then((response) => {
      setCharacters(response.data.data.results);
    });
  }, []);

  console.log(creators);
  return (
    currentComics && (
      <>
        <Grid
          style={{ display: 'flex', marginTop: 25, marginBottom: 25 }}
          container
        >
          <Grid style={{ display: 'flex' }} spacing={5}>
            <CardMedia
              className={classes.card}
              component="img"
              alt="avatar"
              image={`${currentComics.thumbnail!.path}.${
                currentComics.thumbnail!.extension
              }`}
              title="avatar"
            />
            <CardContent>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {currentComics.title}
                </Typography>
              </div>
              <Divider />
              {currentComics.description ? (
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {currentComics.description}
                </Typography>
              ) : (
                <Typography
                  className={classes.description}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Description Missing!{' '}
                </Typography>
              )}
              <Divider className={classes.divider} />
              <Typography
                gutterBottom
                color="textSecondary"
                variant="body2"
                component="p"
              >
                <span>Creators: </span>
                {creators.length > 0
                  ? creators
                      .map((creator: any) => creator.fullName, ',')
                      .join(', ')
                  : 'No available information !'}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                <span>Published: </span>
                <Moment format="YYYY/MM/DD">
                  {currentComics.dates[0].date}
                </Moment>
              </Typography>

              <IconButton onClick={() => handleClick('paper')}>
                <NavigateNextIcon fontSize="small" />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">Characters</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    style={{ display: 'flex' }}
                  >
                    {characters &&
                      characters.map((character: any) => (
                        <GridList cellHeight={160} cols={3}>
                          <ComicsCharacters
                            key={character.id}
                            data={character}
                          />
                        </GridList>
                      ))}
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Grid>
        </Grid>
      </>
    )
  );
};
