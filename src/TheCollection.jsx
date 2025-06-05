import { useEffect, useState } from "react";
import { getCollection } from "./api/collection";
import VariantFilter from "./parts/VariantFilter";
import VariantGallery from "./parts/VariantGallery";

function TheCollection() {
    // variant loading
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCount, setFilterCount] = useState(0);

    // fetch the data
    useEffect(() => {
        const fetchCollection = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCollection();
                setCards(data);
            } catch(err) {
                setError(err.message || 'Failed to fetch variants');
            } finally {
                setLoading(false);
            }
        };

        fetchCollection();
    }, []);

    return (
        <div className="container-fluid d-flex flex-column h-100 py-3">
            <VariantFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCount={filterCount} />
            <VariantGallery cards={cards} searchTerm={searchTerm} setFilterCount={setFilterCount} />
        </div>
    );
}

export default TheCollection;
