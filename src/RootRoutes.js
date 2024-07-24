import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Layout/Home";
import NotFound from "./Layout/NotFound";
import CreateEditDeck from "./Layout/CreateEditDeck";
import Deck from "./Layout/Deck";
import Study from "./Layout/Study";
import AddEditCard from "./Layout/AddEditCard";
import DeckProvider from "./Layout/DeckProvider";

function RootRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound/>}/>
            <Route element={<DeckProvider/>}>
                <Route path="/decks/new" element={<CreateEditDeck />}/>
                <Route path="/decks/:deckId" element={<Deck />}/> {/*View button*/}
                <Route path="/decks/:deckId/edit" element={<CreateEditDeck />}/>
                <Route path="/decks/:deckId/study" element={<Study />} /> {/* Study button*/}
                <Route path="/decks/:deckId/cards/new" element={<AddEditCard />}/>
                <Route path="/decks/:deckId/cards/:cardId/edit" element={<AddEditCard />}/>
            </Route>
        </Routes>
    )
}

export default RootRoutes