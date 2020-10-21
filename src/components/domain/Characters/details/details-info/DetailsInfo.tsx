import React from 'react';
import {
  makeStyles,
  Grid,
  CardContent,
  Typography,
  Divider,
} from '@material-ui/core';
import { Media } from 'libs/components/media/media';
import { IDetails } from '../../character-inferfaces/character-interfaces';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
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

type Props = {
  data: IDetails;
};

export const DetailsInfo = ({ data }: Props) => {
  const classes = useStyles();

  return (
    <>
      {data && (
        <>
          <Grid
            style={{ display: 'flex', marginTop: 25, marginBottom: 25 }}
            container
          >
            <Grid style={{ display: 'flex' }}>
              <Media
                className={classes.card}
                alt="avatar"
                image={`${data.thumbnail!.path}.${data.thumbnail!.extension}`}
                title="avatar"
              />
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {data.title}
                  </Typography>
                </div>
                <Divider />
                {data.description ? (
                  <Typography
                    className={classes.description}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {data.description}
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
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  <span>Last Updated: </span>
                  {/* <Moment format="YYYY/MM/DD">{data.modified}</Moment> */}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
