import React from "react";
import DeckForm from "./DeckForm";
import { useOutletContext } from "react-router-dom";

function EditDeck() {
    const {deck, reloadDeck} = useOutletContext()

    return (
        <DeckForm deck={deck} reloadDeck={reloadDeck}/>
    )
}

export default EditDeck