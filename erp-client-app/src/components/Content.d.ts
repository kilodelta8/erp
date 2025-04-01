import React, { ReactNode } from 'react';
import '../css/Content.css';
interface ContentProps {
    children: ReactNode;
    className?: string;
}
declare const Content: React.FC<ContentProps>;
export default Content;
