import { jsx as _jsx } from "react/jsx-runtime";
import '../css/Content.css'; // Import the CSS file
const Content = ({ children, className }) => {
    return (_jsx("div", { className: `content-container ${className || ''}`, children: children }));
};
export default Content;
