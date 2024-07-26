import React from "react";
import CardForm from "./CardForm";
import { useOutletContext } from "react-router-dom";

function AddCard() {
    const {deck, reloadDeck} = useOutletContext()

    return (
        <CardForm deck={deck} reloadDeck={reloadDeck}/>
    )
}

export default AddCard;