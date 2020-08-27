import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function BottomNav() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const total = useSelector((state: any) => state.characters?.total);

  return (
    <Grid
      container
      justify="space-between"
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
          return setCurrentOffset(currentOffset - 20), window.scrollTo(0, 0);
        }}
      >
        Previous Heroes
      </Button>
      <Button
        color="primary"
        variant={'contained'}
        disabled={currentOffset === total}
        onClick={() => {
          return setCurrentOffset(currentOffset + 20), window.scrollTo(0, 0);
        }}
      >
        More Heroes
      </Button>
    </Grid>
  );
}
