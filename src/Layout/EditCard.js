import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
    const {deck, reloadDeck} = useOutletContext()

    return (
        <CardForm deck={deck} reloadDeck={reloadDeck}/>
    )
}

export default EditCard;