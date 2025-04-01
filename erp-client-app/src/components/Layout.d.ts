import React, { ReactNode } from 'react';
import '../css/Layout.css';
interface LayoutProps {
    children: ReactNode;
    onLogout: () => void;
}
declare const Layout: React.FC<LayoutProps>;
export default Layout;
