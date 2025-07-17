import { useCallback, useEffect, useRef, useState } from "react";
import VariantFilter from "./parts/VariantFilter";
import VariantGallery from "./parts/VariantGallery";
import CreditsModal from "./parts/CreditsModal";
import { useUser } from "./hooks/useUser";
import { Link } from "react-router";

function TheCollection({cards, loading, error}) {
    const [creditsOpen, setCreditsOpen] = useState(false);

    // filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCount, setFilterCount] = useState(0);

    const {username} = useUser();

    const linkClass = 'link-light link-underline link-underline-opacity-0 link-underline-opacity-75-hover';

    const openCreditsModal = useCallback(() => setCreditsOpen(true));
    const closeCreditsModal = useCallback(() => setCreditsOpen(false));

    return (
        <>
            <div className="container-fluid d-flex flex-column h-100 py-3">
                <div className="d-flex">
                    <a href="#" className={linkClass} style={{ marginTop: '-0.75rem' }} onClick={openCreditsModal}>Credits</a>
                    <h1 className="flex-grow-1 text-center fw-bold">The Collection</h1>
                    {username ? (
                        <div className="d-flex flex-column text-end" style={{ marginTop: '-0.75rem' }}>
                            <p className="py-0 my-0">{username}</p>
                            <Link to="/collection/add" className={linkClass}>Add</Link>
                            <Link to="/collection/logout" className={linkClass}>Logout</Link>
                        </div>
                    ) : (
                        <a href="/collection/login" className={linkClass} style={{ marginTop: '-0.75rem' }}>Login</a>
                    )}
                </div>
                <VariantFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} filterCount={filterCount} />
                <VariantGallery cards={cards} loading={loading} error={error} searchTerm={searchTerm} setFilterCount={setFilterCount} />
            </div>
            <CreditsModal open={creditsOpen} close={closeCreditsModal} />
        </>
    );
}

export default TheCollection;
