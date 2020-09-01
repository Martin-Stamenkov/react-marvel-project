import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { fetchAllSeries } from '../../../../store/actions';
import { Callback } from 'components/generic/callback/Callback';
import ComicsCard from 'components/domain/comics/comics-card/ComicsCard';

export const SeriesList = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const dispatch = useDispatch();
  const total = useSelector((state: any) => state.series?.total);
  const series = useSelector((state: any) => state.series?.results);
  const loading = useSelector((state: any) => state.loading);
  useEffect(() => {
    dispatch(fetchAllSeries(currentOffset));
  }, [currentOffset]);

  return (
    <>
      {loading ? (
        <Callback />
      ) : (
        <>
          <Grid container spacing={3} justify="center">
            {series &&
              series.map((card: any, index: number) => (
                <ComicsCard key={index} data={card} />
              ))}
          </Grid>
          <Grid
            container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 20px',
              borderTop: '1px solid lightgrey',
            }}
          >
            <Button
              disabled={currentOffset === 0}
              onClick={() => {
                return (
                  setCurrentOffset(currentOffset - 20), window.scrollTo(0, 0)
                );
              }}
            >
              Previous Series
            </Button>
            <Button
              color="primary"
              variant={'contained'}
              disabled={currentOffset === total}
              onClick={() => {
                return (
                  setCurrentOffset(currentOffset + 20), window.scrollTo(0, 0)
                );
              }}
            >
              More Series
            </Button>
          </Grid>
        </>
      )}
    </>
  );
};
