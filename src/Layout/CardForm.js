import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";
import { readCard } from "../utils/api";

function CardForm({deck, reloadDeck}) {
    const navigate = useNavigate()
    const {deckId, cardId} = useParams();

    const initialCard = {
        front: "",
        back: ""
    }
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({...initialCard});

    useEffect(() => {
        if (cardId) {
            const abortController = new AbortController()
        
        async function loadCard() {
            try {
                const cardFromApi = await readCard(cardId, abortController.signal)
                setFormData(cardFromApi)
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error);
                }
            }
        }
        loadCard()
        return () => abortController.abort()
        }
    }, [cardId])

    const handleSave = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        
        try {
            let response;
            if (deck && cardId) {
                const updatedCard = { ...formData, id: cardId };
                response = await updateCard(updatedCard, abortController.signal);
                navigate(`/decks/${deckId}`);
            } else {
                response = await createCard(deckId,formData, abortController.signal);
                setFormData({...initialCard});
            }    
            reloadDeck();
        } catch (error) {
            setError(error);
        }
    }

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleDone = (event) => {
        event.preventDefault()
        navigate(`/decks/${deck.id}`);
    }

    if (!deck)  {
        return <div>Loading...</div>;
    }

    return (
        <div className="simple-border-style">
            <h3>
                <span>{deck.name}</span>: <span>{cardId ? "Edit Card" : "Add Card"}</span>
            </h3>
            <form onSubmit={handleSave}>
                <div>
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        value={formData.front}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        value={formData.back}
                        onChange={handleChange}
                    />
                </div>
                {cardId ? (
                    <div>
                        <button className="button button-cancel"
                            type="button" 
                            onClick={handleDone}
                        >Cancel</button>
                        <button className="button button-submit" type="submit">Submit</button>
                    </div>
                ): (
                    <div>
                        <button 
                            className="button button-study"
                            type="button" 
                            onClick={handleDone}
                        >Done</button>
                        <button className="button button-submit" type="submit">Save</button>
                    </div>
                )}
                
            </form>
        </div>
    )
}

export default CardForm