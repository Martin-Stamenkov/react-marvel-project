import React from 'react';
import { Tooltip } from '@material-ui/core';

type TooltipProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  title: string;
};

export const TooltipCard = (props: TooltipProps) => {
  return (
    <>
      <Tooltip arrow title={props.title}>
        {props.children}
      </Tooltip>
    </>
  );
};
