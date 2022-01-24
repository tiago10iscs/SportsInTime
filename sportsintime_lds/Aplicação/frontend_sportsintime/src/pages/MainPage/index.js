import './index.css'
import React, { useState } from 'react'
import GameList from "../../components/GameList"
import { FaRegDotCircle } from 'react-icons/fa'

/**
 * Função que permite gerar a página inicial do website que contém uma lista de jogos dos próximos dias.
 * Para além disso possui dois botões que permitem filtrar a lista, sendo possível ver todos os jogos 
 * ou apenas os que estão a acontecer no momento
 * 
 * @returns uma página inicial
 */
function MainPage() {
    const [filter, setFilter] = useState("a")

    const liveMatchs = () => setFilter("l");

    const allMatchs = () => setFilter("a");

    return (
        <>
            <main>
                <div className="container">
                    <div className="buttonContainer">
                        <button className="allButton" onClick={allMatchs}>ALL</button>
                        <button className="liveBtn" onClick={liveMatchs} >
                            <FaRegDotCircle className="liveIcon" />
                            <span className="liveText">LIVE</span>
                        </button>
                    </div>
                    <GameList filter={filter} date = ""/>
                </div>
            </main>
        </>
    );
}

export default MainPage;