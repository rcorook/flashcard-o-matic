import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DeckCard from "./DeckCard";
import { listDecks } from "../utils/api";

function DeckList() {
    const navigate = useNavigate();
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController()
        
        async function loadDecks() {
            try {
                const decksFromApi = await listDecks(abortController.signal)
                setDecks(decksFromApi)
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error);
                }
            }
        }
        loadDecks()
        return () => abortController.abort()
    }, [])

    const refreshDecks = async () => {
        const abortController = new AbortController();
        try {
            const decksFromApi = await listDecks(abortController.signal);
            setDecks(decksFromApi);
        } catch (error) {
            if (error.name !== "AbortError") {
                setError(error);
            }
        }
    };

    if (!decks) {
        <div>Loading...</div>
    }

    if (error) {
        return <div>Error loading decks: {error.message}</div>;
    }

    return (
        <>
            {decks.map((deck) => (
                <div key={deck.id}>
                    <DeckCard deck={deck} onDeckDeleted={refreshDecks}/>
                 </div>
            ))}
        </>
    )
}

export default DeckList
