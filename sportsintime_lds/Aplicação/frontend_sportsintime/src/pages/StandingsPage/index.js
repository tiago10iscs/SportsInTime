import { React, useState, useLayoutEffect } from 'react'
import "./index.css"
import Axios from "axios"

import StandingsLine from '../../components/StandingsLine'

/**
 * Função que permite gerar a página classificações, será apresentada a tabela classificativa com algumas informações
 * importantes incluindo partidas jogadas, vitórias, empates e derrotas, golos e pontos das várias equipas
 * @returns uma página de classificações
 */
function StandingsPage() {

    const [standings, setStandings] = useState([]);

    /**
     * Função utilizada para obter as informações de classificações provenientes do back end
     */
    const getStandings = () => {
        Axios.get("https://localhost:7261/api/classificacoes")
            .then((res) => {
                setStandings(res.data)
            })
    }

    /**
     * Esta função vai lançar a função getStandings cada vez que a página é carregada, de modo 
     * a atualizar a informação apresentada ao utilizador
     */
    useLayoutEffect(() => {
        getStandings();
    }, []);

    
    return(
        <div className="standingsContainer">
            <StandingsLine className="StandsTitle" title="true" />
            {standings.map((item, index) => {
                return(
                    <StandingsLine className="team" title="false" data={item} key={index} />
                )
            })}
        </div>
        )
}

export default StandingsPage;

