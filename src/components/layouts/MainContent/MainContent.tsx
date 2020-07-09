import React from 'react';
import ProfilePage from 'pages/Profile/profile-edit-mode/profile-edit-mode';

const MainContent: React.FC = ({ children }) => {
  return (
    <main>
      <div style={{ minHeight: '100vh' }}>{children}</div>
    </main>
  );
};
export default MainContent;
