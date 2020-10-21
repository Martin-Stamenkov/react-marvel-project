import React, { useMemo } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Grid,
  makeStyles,
  createStyles,
  Theme,
  CardActions,
} from '@material-ui/core';
import { history } from 'app/App';
import { useSelector } from 'react-redux';
import { IComics } from 'components/domain/comics/comics-interfaces/comics-interfaces';
import { GenericButton } from 'libs/components/button/generic-button';
import { Media } from 'libs/components/media/media';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      maxWidth: 260,
      boxShadow: '3px  3px  5px  grey',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    root: {
      margin: 20,
    },
  });
});

type Props = {
  data: IComics;
};

export default function ComicsCard({ data }: Props) {
  console.log(data);
  const classes = useStyles();
  const comics = useSelector(
    (state: any) => state.comicsReducer.comics?.results
  );

  const currentComics = useMemo(
    () => comics && comics.find((x: IComics) => x.id === data.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleClick = () => {
    history.push(`/my-comics/${currentComics.id}`);
  };

  return (
    <>
      <Grid className={classes.root} item>
        <Card className={classes.card}>
          <CardContent>
            <Typography align="center" gutterBottom variant="h5" component="h2">
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="center"
            >
              comics
            </Typography>
          </CardContent>
          <Media
            alt="avatar"
            image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
            title="avatar"
            style={{
              width: '100%',
              flexGrow: 2,
              objectFit: 'inherit',
            }}
          />
          <CardActions>
            <div>
              <GenericButton
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleClick()}
              >
                Details
              </GenericButton>
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
