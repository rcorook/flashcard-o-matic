import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteCard } from "../utils/api";

function Card({card, deckId, onDelete}) {
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleDelete = async (cardId) => {
        const result = window.confirm("Delete this card?");
        if (result) {
          try {
            const abortController = new AbortController()
            await deleteCard(cardId, abortController.signal);
            onDelete()
          } catch (error) {
            setError(error);
          }
        }
    };

    return (
        <>
            <div className="simple-border-style" key={card.id}>
                <p><strong>{card.front}</strong></p>
                <hr />
                <p>{card.back}</p>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button className="button button-edit">Edit</button></Link>
                <button className="button button-delete" onClick={() => {handleDelete(card.id)}}>Delete</button>
         </div>
         <br />
        </>
    )
}

export default Card