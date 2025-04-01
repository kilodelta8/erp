import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/LaborEntriesList.css'; // Import the CSS file
const LaborEntriesList = () => {
    const [laborEntries, setLaborEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchLaborEntries = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/labor-entries');
                if (!response.ok) {
                    throw new Error('Failed to fetch labor entries');
                }
                const data = await response.json();
                setLaborEntries(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError('An unknown error occurred.');
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchLaborEntries();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "labor-entries-list-container", children: [_jsx("h2", { children: "Labor Entries" }), laborEntries.length > 0 ? (_jsxs("table", { className: "labor-entries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Employee Name" }), _jsx("th", { children: "Project" }), _jsx("th", { children: "Task" }), _jsx("th", { children: "Hours" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: laborEntries.map((entry) => (_jsxs("tr", { children: [_jsx("td", { children: entry.employeeName }), _jsx("td", { children: entry.project }), _jsx("td", { children: entry.task }), _jsx("td", { children: entry.hours }), _jsx("td", { children: new Date(entry.date).toLocaleDateString() }), _jsx("td", { children: _jsx(Link, { to: `/labor-entries/${entry.id}`, children: "View Details" }) })] }, entry.id))) })] })) : (_jsx("div", { children: "No labor entries found." })), _jsx(Link, { to: "/labor-entries/create", className: "create-entry-link", children: "Create New Entry" })] }));
};
export default LaborEntriesList;
