import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckCard({deck, onDeckDeleted}) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleDelete = async (deckId) => {
        const result = window.confirm("Delete this deck?");
        if (result) {
          try {
            const abortController = new AbortController()
            await deleteDeck(deckId, abortController.signal);
            onDeckDeleted();
            navigate("/");
          } catch (error) {
            setError(error);
          }
        }
    };

    const handleViewClick = async (deckId) => {
      navigate(`/decks/${deckId}`)
    }

    return (
        <div className="deck-card">
            <div className="deck-card-header">
              <p className="deck-card-name">{deck.name}</p>
              <p className="deck-card-card-count">{deck.cards.length} {deck.cards.length > 1 || deck.cards.length === 0 ? "cards" : "card"}</p>
            </div>
            <p>{deck.description}</p>
            <button className="button button-view" onClick={() => {handleViewClick(deck.id)}}>View</button>
            <Link to={`/decks/${deck.id}/study`}><button className="button button-study">Study</button></Link>
            <button className="button button-delete"onClick={() => {handleDelete(deck.id)}}>Delete</button>
        </div>
    )
}

export default DeckCard