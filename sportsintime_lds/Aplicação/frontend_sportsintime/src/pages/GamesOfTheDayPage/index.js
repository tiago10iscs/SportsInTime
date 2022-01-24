import React, { useState} from 'react'
import './index.css'
import { FaRegDotCircle } from 'react-icons/fa'
import GameList from '../../components/GameList'

/**
 * Página correspondente aos jogos de um determinado dia, dia esse que é dado como input de acordo com a data da maquina onde corre o servidor
 * @returns os jogos desse mesmo dia
 */
function GamesOfTheDay() {

    var date = new Date();
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = String(date.getFullYear());

    var current_date = year + '-' + month + '-' + day;

    //Verificar o formato da data e se a mesma se recebe desta maneira

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
                    <GameList filter={filter} date = {current_date}/>
                </div>
            </main>
        </>
    );
    
 
}

export default GamesOfTheDay;
