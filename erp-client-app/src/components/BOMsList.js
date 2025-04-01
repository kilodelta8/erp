import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/BOMsList.css'; // Import the CSS file
const BOMList = () => {
    const [boms, setBOMs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBOMs = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch('/api/boms');
                if (!response.ok) {
                    throw new Error('Failed to fetch BOMs');
                }
                const data = await response.json();
                setBOMs(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError("An unknown error occurred.");
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchBOMs();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "bom-list-container", children: [_jsx("h2", { children: "Bill of Materials (BOMs)" }), boms.length > 0 ? (_jsxs("table", { className: "bom-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "BOM Name" }), _jsx("th", { children: "Created At" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: boms.map((bom) => (_jsxs("tr", { children: [_jsx("td", { children: bom.bomName }), _jsx("td", { children: new Date(bom.createdAt).toLocaleDateString() }), _jsx("td", { children: _jsx(Link, { to: `/boms/${bom.id}`, children: "View Details" }) })] }, bom.id))) })] })) : (_jsx("div", { children: "No BOMs found." })), _jsx(Link, { to: "/boms/create", className: "create-bom-link", children: "Create New BOM" })] }));
};
export default BOMList;
