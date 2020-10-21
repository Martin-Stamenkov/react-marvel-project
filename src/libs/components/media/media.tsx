import React, { CSSProperties } from 'react';

type MediaProps = {
  className?: string;
  alt: string;
  image: string;
  title: string;
  style?: CSSProperties;
};

export const Media = (props: MediaProps) => {
  return (
    <>
      <img
        style={props.style}
        className={props.className}
        alt={props.alt}
        src={props.image}
        title={props.title}
      />
    </>
  );
};
