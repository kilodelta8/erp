import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/LaborEntryDetails.css'; // Import the CSS file
const LaborEntryDetails = () => {
    const { entryId } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchEntryDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/labor-entries/${entryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch labor entry details');
                }
                const data = await response.json();
                setEntry(data);
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
        fetchEntryDetails();
    }, [entryId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    if (!entry) {
        return _jsx("div", { children: "Labor entry not found." });
    }
    return (_jsxs("div", { className: "labor-entry-details-container", children: [_jsx("h2", { children: "Labor Entry Details" }), _jsxs("div", { className: "entry-info", children: [_jsxs("p", { children: [_jsx("strong", { children: "Employee Name:" }), " ", entry.employeeName] }), _jsxs("p", { children: [_jsx("strong", { children: "Project:" }), " ", entry.project] }), _jsxs("p", { children: [_jsx("strong", { children: "Task:" }), " ", entry.task] }), _jsxs("p", { children: [_jsx("strong", { children: "Hours:" }), " ", entry.hours] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", new Date(entry.date).toLocaleDateString()] })] }), _jsx(Link, { to: "/labor-entries", className: "back-to-list", children: "Back to Labor Entries List" })] }));
};
export default LaborEntryDetails;
