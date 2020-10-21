import React from 'react';
import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';

export const FloatingActionButton = () => {
  const trigger = useScrollTrigger();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Zoom in={trigger}>
        <div
          style={{
            position: 'fixed',
            bottom: 50,
            right: 100,
            zIndex: 'auto',
          }}
          role="presentation"
          onClick={() => handleClick()}
        >
          <Fab
            style={{
              backgroundColor: 'green',
              color: 'white',
            }}
          >
            <UpIcon />
          </Fab>
        </div>
      </Zoom>
    </>
  );
};
