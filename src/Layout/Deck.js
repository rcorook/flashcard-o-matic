import React, {useState} from "react";
import { Link, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import Card from "./Card";

function Deck() {
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const {deckId} = useParams()
    const {deck, reloadDeck} = useOutletContext()

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

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!deck) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <br />
            <div className="deck-header centered">
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
                <div className="button-container">
                <Link to={`/decks/${deckId}/edit`}><button className="button button-edit">Edit</button></Link>
                <Link to={`/decks/${deckId}/study`}><button className="button button-study">Study</button></Link>
                <Link to={`/decks/${deckId}/cards/new`}><button className="button button-add">+ Add Cards</button></Link>
                <button className="button button-delete" onClick={() => handleDeleteDeck(deckId)}>Delete</button>
                </div>
            </div>
            <br />
            <br />
            <h3 className="cards-title">Cards</h3>
            {deck.cards && deck.cards.length > 0 ? (
                deck.cards && deck.cards.map((card) => (
                    <Card key={card.id} card={card} deckId={deckId} onDelete={reloadDeck}/>
                ))
            ) : (
                <p className="simple-border-style">No cards in this deck.</p>
            )}
            
        </>
    )
}

export default Deck