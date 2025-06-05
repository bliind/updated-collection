import { useEffect, useMemo } from "react";
import VariantCard from "./VariantCard";

function VariantGallery({ cards, searchTerm, setFilterCount }) {
    const sanitizeText = (text) => {
        try {
            return text.replace(/[^0-9a-z]/gi, '').toLowerCase();
        } catch(err) {
            return '';
        }
    }

    const filteredCards = useMemo(() => {
        const sanitizedSearchTerm = sanitizeText(searchTerm);
        const keysToCheck = ['card_name', 'variant_name', 'artist_name', 'tags'];

        return cards.filter((card) => {
            if (!card.video_link && 'needed'.includes(sanitizedSearchTerm)) {
                return true;
            }

            for (let keyToCheck of keysToCheck) {
                if (card[keyToCheck] && typeof card[keyToCheck] !== 'string') {
                    return false;
                }

                if (sanitizeText(card[keyToCheck]).includes(sanitizedSearchTerm)) {
                    return true;
                }
            }
        });
    }, [searchTerm, cards]);

    useEffect(() => {
        setFilterCount(filteredCards.length);
    }, [filteredCards, setFilterCount]);

    return (
        <div className="d-flex flex-wrap w-100 ms-auto justify-content-center align-items-center pt-1 overflow-auto">
            {filteredCards.map((card) => (
                <VariantCard key={card.id} card={card} />
            ))}
        </div>
    );
}

export default VariantGallery;
