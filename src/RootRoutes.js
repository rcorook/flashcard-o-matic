import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Layout/Home";
import NotFound from "./Layout/NotFound";
import CreateDeck from "./Layout/CreateDeck";
import EditDeck from "./Layout/EditDeck";
import Deck from "./Layout/Deck";
import Study from "./Layout/Study";
import AddCard from "./Layout/AddCard";
import EditCard from "./Layout/EditCard";
import DeckProvider from "./Layout/DeckProvider";

function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound/>}/>
            <Route element={<DeckProvider/>}>
                <Route path="/decks/new" element={<CreateDeck />}/>
                <Route path="/decks/:deckId" element={<Deck />}/> {/*Entry point: View button*/}
                <Route path="/decks/:deckId/edit" element={<EditDeck />}/>
                <Route path="/decks/:deckId/study" element={<Study />} />
                <Route path="/decks/:deckId/cards/new" element={<AddCard />}/>
                <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />}/>
            </Route>
        </Routes>
    )
}

export default RootRoutes