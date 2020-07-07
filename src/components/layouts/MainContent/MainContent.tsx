import React from 'react';

const MainContent: React.FC = ({ children }) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
};
export default MainContent;