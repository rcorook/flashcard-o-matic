import React, {useState, useEffect} from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import Card from "./Card";

function Deck() {
    const navigate = useNavigate()
    const [deck, setDeck] = useState(null);
    const [error, setError] = useState(null);
    const {deckId} = useParams()

    const loadDeck = async () => {
        const abortController = new AbortController();
        try {
            const deckFromApi = await readDeck(deckId, abortController.signal);
            setDeck(deckFromApi);
        } catch (error) {
            if (error.name !== "AbortError") {
                setError(error);
            }
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    const handleDeleteDeck = async (deckId) => {
        const result = window.confirm("Delete this deck?");
        if (result) {
          try {
            const abortController = new AbortController()
            await deleteDeck(deckId, abortController.signal);
            navigate("/");
          } catch (error) {
            setError(error);
          }
        }
    };

    const handleCardDelete = () => {
        loadDeck();
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!deck) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <br />
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`}><button className="button button-edit">Edit</button></Link>
            <Link to={`/decks/${deckId}/study`}><button className="button button-study">Study</button></Link>
            <Link to={`/decks/${deckId}/cards/new`}><button className="button button-add">+ Add Cards</button></Link>
            <button className="button button-delete" onClick={() => handleDeleteDeck(deckId)}>Delete</button>
            <br />
            <br />
            <h3 className="cards-title">Cards</h3>
            {deck.cards && deck.cards.length > 0 ? (
                deck.cards && deck.cards.map((card) => (
                    <Card key={card.id} card={card} deckId={deckId} onDelete={handleCardDelete}/>
                ))
            ) : (
                <p>No cards in this deck yet.</p>
            )}
            
        </>
    )
}

export default Deck