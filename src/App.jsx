import { Suspense, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router'
import { UserProvider } from './context/UserContext';
import TheCollection from './TheCollection';
import VariantForm from './VariantForm';
import LoginForm from './LoginForm';
import Logout from './Logout';
import { getCollection } from "./api/collection";

function App() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadVariants = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCollection();
            data.sort((a, b) => {
                const cardNameComparison = a.card_name.localeCompare(b.card_name);
                if (cardNameComparison !== 0) return cardNameComparison;

                const variantNameA = a.variant_name !== '' ? a.variant_name : a.artist_name;
                const variantNameB = b.variant_name !== '' ? b.variant_name : b.artist_name;

                return variantNameA.localeCompare(variantNameB)
            })
            setCards(data);
        } catch(err) {
            console.error("Error fetching variants:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadVariants();
    }, [loadVariants]);

    const uniqueCardNames = [...new Set(cards.map(v => v.card_name).filter(Boolean))];
    const uniqueVariantNames = [...new Set(cards.map(v => v.variant_name).filter(Boolean))];
    const uniqueArtistNames = [...new Set(cards.map(v => v.artist_name).filter(Boolean))];
    const uniqueTags = [...new Set(cards.flatMap(v => v.tags ? v.tags.split(',').map(tag => tag.trim()) : []).filter(Boolean))];

    return (
        <BrowserRouter>
            <Suspense fallback={<div className="container py-5"><h1>Loading...</h1></div>}>
                <UserProvider>
                    <Routes>
                        <Route path="/collection/" element={<TheCollection cards={cards} loading={loading} error={error} />} />
                        <Route path="/collection/add" element={<VariantForm 
                            cardNames={uniqueCardNames}
                            variantNames={uniqueVariantNames}
                            artistNames={uniqueArtistNames}
                            tagNames={uniqueTags}
                            onVariantAdded={loadVariants} />}
                        />
                        <Route path="/collection/edit/:id" element={<VariantForm 
                            cardNames={uniqueCardNames}
                            variantNames={uniqueVariantNames}
                            artistNames={uniqueArtistNames}
                            tagNames={uniqueTags}
                            onVariantAdded={loadVariants} />}
                        />
                        <Route path="/collection/login" element={<LoginForm />} />
                        <Route path="/collection/logout" element={<Logout />} />
                    </Routes>
                </UserProvider>
            </Suspense>
        </BrowserRouter>
    )
}

export default App
