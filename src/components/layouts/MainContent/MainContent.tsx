import React from 'react';
import { styles } from './main.styles';

const MainContent: React.FC = ({ children }) => {
  const classes = styles();
  return (
    <main>
      <div className={classes.main}>{children}</div>
    </main>
  );
};
export default MainContent;
