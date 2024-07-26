import React from "react";
import DeckForm from "./DeckForm";
import { useOutletContext } from "react-router-dom";

function CreateDeck() {
    const {deck, reloadDeck} = useOutletContext()

    return (
        <DeckForm deck={deck} reloadDeck={reloadDeck}/>
    )
}

export default CreateDeck