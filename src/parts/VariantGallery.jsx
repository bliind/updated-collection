import { useCallback, useEffect, useMemo, useState } from "react";
import VariantCard from "./VariantCard";
import PlaceholderCard from "./PlaceholderCard";
import VideoModal from "./VideoModal";

function VariantGallery({ cards, loading, error, searchTerm, setFilterCount }) {
    const [modalCard, setModalCard] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const sanitizeText = (text) => {
        try {
            return text.replace(/[^0-9a-z ]/gi, '').toLowerCase();
        } catch(err) {
            return '';
        }
    }

    const filteredCards = useMemo(() => {
        const sanitizedSearchTerm = sanitizeText(searchTerm);
        const searchTerms = sanitizedSearchTerm.split(' ').filter(term => term);

        const filtered = cards.filter((card) => {
            const queryable = [card.card_name, card.artist_name];
            if (card.variant_name) queryable.push(card.variant_name);
            if (card.tags) queryable.push(card.tags);
            if (!card.video_link) queryable.push('needed');

            const checkString = sanitizeText(queryable.join(' '));

            return searchTerms.every(searchTerm => checkString.includes(searchTerm));
        });

        return filtered
    }, [searchTerm, cards]);

    useEffect(() => {
        setFilterCount(filteredCards.length);
    }, [filteredCards, setFilterCount]);

    const openModal = useCallback((card) => {
        setModalCard(card);
        setModalOpen(true);
    }, [setModalCard, setModalOpen]);

    return (
        <>
            <div className="d-flex flex-wrap w-100 ms-auto justify-content-center align-items-center pt-1 overflow-auto">
                {loading ? (
                    [...Array(50)].map((_, index) => <PlaceholderCard key={index} />)
                ) : error ? (
                    <p className="text-danger">Error: {error}</p>
                ) :
                    filteredCards.map((card) => (
                        <VariantCard key={card.id} card={card} openModal={openModal} />
                    )
                )}
            </div>
            <VideoModal card={modalCard} open={modalOpen} setOpen={setModalOpen} />
        </>
    );
}

export default VariantGallery;
