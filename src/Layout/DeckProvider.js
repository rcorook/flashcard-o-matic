import React, {useState, useEffect} from "react";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function DeckProvider() {
    const location = useLocation()
    const [secondNav, setSecondNav] = useState("");
    const [thirdNav, setThirdNav] = useState(null);
    const {deckId, cardId} = useParams()
    const [deck, setDeck] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (deckId) {
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
        }
    }, [deckId])

    useEffect(() => {
        const path = location.pathname.toLowerCase();

        if (path.includes("/new") && !deckId) {
            setSecondNav("Create Deck");
        } else if (deck) {
            setSecondNav(`${deck.name}`)
            if (path.includes("study")) {
                setThirdNav("Study")
            } else if (path.includes("edit") && !cardId) {
                setThirdNav("Edit Deck")
            } else if (path.includes("cards/new")) {
                setThirdNav("Add Card")
            } else if (path.includes("edit") && cardId) {
                setThirdNav(`Edit Card ${cardId}`)
            } else {
                setThirdNav(null)
            }
        } else {
            setSecondNav("")
            setThirdNav(null);
        }

    }, [location, deckId, deck]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <nav className="simple-border-style">
                <h3>
                    <Link to="/" >Home</Link> {' / '} 
                    {secondNav && (
                        thirdNav ? (
                            <>
                                <Link to={`/decks/${deckId}`}>Deck: {secondNav}</Link> {' / '}
                                {thirdNav}
                            </>
                        ) : (
                            secondNav
                        )
                    )}
                </h3>
            </nav>
            <br />
            <Outlet context={deck}/>
        </div>
    )
}

export default DeckProvider