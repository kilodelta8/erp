import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LaborEntriesList from './LaborEntriesList';
import LaborEntryForm from './LaborEntryForm';
import LaborEntryDetails from './LaborEntryDetails';
import '../css/LaborEntriesPage.css'; // Import the CSS file
const LaborEntriesPage = () => {
    return (_jsx(Router, { children: _jsxs("div", { className: "labor-entries-page-container", children: [_jsxs("nav", { className: "labor-entries-nav", children: [_jsx(Link, { to: "/labor-entries", children: "Labor Entries List" }), _jsx(Link, { to: "/labor-entries/create", children: "Create Labor Entry" })] }), _jsx("div", { className: "labor-entries-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/labor-entries", element: _jsx(LaborEntriesList, {}) }), _jsx(Route, { path: "/labor-entries/create", element: _jsx(LaborEntryForm, {}) }), _jsx(Route, { path: "/labor-entries/:entryId", element: _jsx(LaborEntryDetails, {}) })] }) })] }) }));
};
export default LaborEntriesPage;
