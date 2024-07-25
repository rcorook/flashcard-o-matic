import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
    const {deckId} = useParams();
    const [error, setError] = useState(null);
    const [cardCounter, setCardCounter] = useState(1);
    const [flipped, setFlipped] = useState(false);
    const navigate = useNavigate();
    const {deck, reloadDeck} = useOutletContext();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!deck) {
        return <div>Loading...</div>
    }

    const cardNum =  deck.cards?.length || 0;
    const cards = deck.cards;

    const handleNext = () => {
        if (cardCounter === cardNum) {
            const result = window.confirm("All cards have been flipped. Restart cards?");
            if (result) {
                setCardCounter(1)
                setFlipped(false)
            } else {
                navigate("/")
            }
        } else {
            setCardCounter(cardCounter + 1)
        setFlipped(false)
        }
    }

    return (
        <div className="simple-border-style">
            <h3><span>Study: </span><span>{deck.name}</span></h3>
            <br />
            { cardNum < 3 ? (
                <div>
                    <h3>Not enough cards.</h3>
                    <p>{`You need at least 3 cards to study. There are ${cardNum} cards in this deck.`}</p>
                    <Link to={`/decks/${deckId}/cards/new`}><button className="button button-add">+ Add Cards</button></Link>
                </div>
            ): (
                cardNum > 0 && (
                    flipped ? (
                        <div>
                            <p>{`Card ${cardCounter} of ${cardNum}`}</p>
                            <h3>{cards[cardCounter-1].back}</h3>
                            <br />
                            <button className="button button-study" onClick={() => {setFlipped(false)}}>Flip</button>
                            <button className="button button-view" onClick={() => {handleNext()}}>Next &gt;&gt;</button>
                        </div>
                    ) : (
                        <div>
                            <p>{`Card ${cardCounter} of ${cardNum}`}</p>
                            <h3>{cards[cardCounter-1].front}</h3>
                            <br />
                            <button className="button button-study" onClick={() => {setFlipped(true)}}>Flip</button>
                        </div>
                    )
                    
                )
            )}
        </div>
    )
}

export default Study