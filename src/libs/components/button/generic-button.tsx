import React from 'react';
import { Button, PropTypes } from '@material-ui/core';

type ButtonProps = {
  children?: string;
  size?: 'small' | 'medium' | 'large';
  color?: PropTypes.Color;
  variant?: 'text' | 'outlined' | 'contained';
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

export const GenericButton = (props: ButtonProps) => {
  return (
    <>
      <Button
        style={props.style}
        size={props.size}
        color={props.color}
        variant={props.variant}
        onClick={props.onClick}
        type={props.type}
        className={props.className}
      >
        {props.children}
      </Button>
    </>
  );
};
