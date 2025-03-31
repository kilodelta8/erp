import React, { ReactNode } from 'react';
import Header from './Header'; // Assuming you have a Header component
import '../css/Layout.css'; // Import the CSS file

interface LayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;