import { useEffect, useRef, useState } from "react";
import { getCollection } from "./api/collection";
import VariantFilter from "./parts/VariantFilter";
import VariantGallery from "./parts/VariantGallery";
import CreditsModal from "./parts/CreditsModal";

function TheCollection() {
    // variant loading
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetched = useRef(false);

    // filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCount, setFilterCount] = useState(0);

    // fetch the data
    useEffect(() => {
        const fetchCollection = async () => {
            if (fetched.current) return;

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
        fetched.current = true;
    }, []);

    return (
        <>
            <div className="container-fluid d-flex flex-column h-100 py-3">
                <div className="d-flex">
                    <a href="#" className="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover" data-bs-toggle="modal" data-bs-target="#creditsModal">Credits</a>
                    <VariantFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCount={filterCount} />
                    <a href="#" className="link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Login</a>
                </div>
                <VariantGallery cards={cards} loading={loading} error={error} searchTerm={searchTerm} setFilterCount={setFilterCount} />
            </div>
            <CreditsModal />
        </>
    );
}

export default TheCollection;
