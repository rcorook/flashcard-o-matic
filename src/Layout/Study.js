import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
    const {deckId} = useParams()
    const [deck, setDeck] = useState(null)
    const [error, setError] = useState(null)
    const [cardCounter, setCardCounter] = useState(1);
    const [flipped, setFlipped] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const abortController = new AbortController()
        
        async function loadDeck() {
            try {
                const deckFromApi = await readDeck(deckId, abortController.signal)
                setDeck(deckFromApi)
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error);
                }
            }
        }
        loadDeck()
        return () => abortController.abort()
    }, [deckId])

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
            const result = window.confirm("Restart cards?");
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
        <>
            <h1><span>Study: </span><span>{deck.name}</span></h1>
            { cardNum < 3 ? (
                <div>
                    <h2>Not enough cards.</h2>
                    <p>{`You need at least 3 cards to study. There are ${cardNum} cards in this deck.`}</p>
                    <Link to={`/decks/${deckId}/cards/new`}><button className="button button-add">+ Add Cards</button></Link>
                </div>
            ): (
                cardNum > 0 && (
                    flipped ? (
                        <div>
                            <h2>{`Card ${cardCounter} of ${cardNum}`}</h2>
                            <p>{cards[cardCounter-1].back}</p>
                            <button className="button button-study" onClick={() => {setFlipped(false)}}>Flip</button>
                            <button className="button button-view" onClick={() => {handleNext()}}>Next &gt;&gt;</button>
                        </div>
                    ) : (
                        <div>
                            <h2>{`Card ${cardCounter} of ${cardNum}`}</h2>
                            <p>{cards[cardCounter-1].front}</p>
                            <button className="button button-study" onClick={() => {setFlipped(true)}}>Flip</button>
                        </div>
                    )
                    
                )
            )}
        </>
    )
}

export default Study