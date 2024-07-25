import React, {useState, useEffect} from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";

function CreateEditDeck() {
    const {deckId} = useParams()
    const {deck, reloadDeck} = useOutletContext()
    const navigate = useNavigate()
    const initialDeck = {
        name: "",
        description: ""
    }   
    const [formData, setFormData] = useState({...initialDeck});
    const [error, setError] = useState();

    useEffect(() => {
        if (deck) {
            setFormData({
                name: deck.name || "",
                description: deck.description || ""
            })
        }
    },[deck,deckId])
    
    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        
        try {
            let response;
            if (deckId) {
                const updatedDeck = { ...formData, id: deckId };
                response = await updateDeck(updatedDeck, abortController.signal);
            } else {
                response = await createDeck(formData, abortController.signal);
            }
            const id = response.id
            navigate(`/decks/${id}`)
            reloadDeck()
        } catch (error) {
            setError(error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault()
        if (deckId) {
            navigate(`/decks/${deckId}`);
        } else {
            navigate("/");
        }
    }

    return (
        <div className="simple-border-style">
            {deckId ? <h3>Edit Deck</h3> : <h3>Create Deck</h3>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <br />
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <br />
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className="button button-cancel"
                        type="button" 
                        onClick={handleCancel}
                    >Cancel</button>
                    <button className="button button-submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateEditDeck