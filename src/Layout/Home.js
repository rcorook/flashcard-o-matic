import React, { useEffect, useState } from "react";
import DeckList from "./DeckList";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>  
            <div className="create-deck">
                <Link to="/decks/new"><button className="button button-add"><h3>+ Create Deck</h3></button></Link>
            </div>
            <DeckList />
        </>
    )
}

export default Home