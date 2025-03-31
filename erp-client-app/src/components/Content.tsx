import React, { ReactNode } from 'react';
import '../css/Content.css'; // Import the CSS file

interface ContentProps {
  children: ReactNode;
  className?: string; // Optional CSS class name
}

const Content: React.FC<ContentProps> = ({ children, className }) => {
  return (
    <div className={`content-container ${className || ''}`}>
      {children}
    </div>
  );
};

export default Content;