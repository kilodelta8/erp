import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import '../css/LaborEntryForm.css'; // Import the CSS file
const LaborEntryForm = () => {
    const [entry, setEntry] = useState({
        employeeName: '',
        project: '',
        task: '',
        hours: 0,
        date: new Date().toISOString().slice(0, 10), // Default to today's date
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntry({ ...entry, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/labor-entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
            });
            if (!response.ok) {
                throw new Error('Failed to create labor entry');
            }
            // Handle successful creation (e.g., redirect, show message)
            console.log('Labor entry created successfully');
            setEntry({ employeeName: '', project: '', task: '', hours: 0, date: new Date().toISOString().slice(0, 10) });
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unknown error occurred.');
            }
        }
    };
    return (_jsxs("div", { className: "labor-entry-form-container", children: [_jsx("h2", { children: "Create New Labor Entry" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "employeeName", children: "Employee Name:" }), _jsx("input", { type: "text", id: "employeeName", name: "employeeName", value: entry.employeeName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "project", children: "Project:" }), _jsx("input", { type: "text", id: "project", name: "project", value: entry.project, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "task", children: "Task:" }), _jsx("input", { type: "text", id: "task", name: "task", value: entry.task, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "hours", children: "Hours:" }), _jsx("input", { type: "number", id: "hours", name: "hours", value: entry.hours, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "date", children: "Date:" }), _jsx("input", { type: "date", id: "date", name: "date", value: entry.date, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", children: "Create Entry" }), error && _jsx("div", { className: "error-message", children: error })] })] }));
};
export default LaborEntryForm;
