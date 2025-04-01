import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/BOMDetails.css'; // Import the CSS file
// Removed duplicate declaration of BOMDetailsParams
const BOMDetails = () => {
    const { bomId } = useParams(); // Use Record<string, string> for compatibility
    const [bomItems, setBOMItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBOMDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`/api/boms/${bomId}/items`);
                if (!response.ok) {
                    throw new Error('Failed to fetch BOM details');
                }
                const data = await response.json();
                setBOMItems(data);
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
        fetchBOMDetails();
    }, [bomId]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "bom-details-container", children: [_jsxs("h2", { children: ["Bill of Materials Details (BOM ID: ", bomId, ")"] }), bomItems.length > 0 ? (_jsxs("table", { className: "bom-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Part Name" }), _jsx("th", { children: "Quantity" }), _jsx("th", { children: "Unit" })] }) }), _jsx("tbody", { children: bomItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.partName }), _jsx("td", { children: item.quantity }), _jsx("td", { children: item.unit })] }, item.id))) })] })) : (_jsx("div", { children: "No items found for this BOM." }))] }));
};
export default BOMDetails;
