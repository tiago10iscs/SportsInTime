import React from "react";
import "./styles.css"
import Tooltip from '@mui/material/Tooltip';

/**
 * Este compoenete é utilizado na página de classificações e representa uma linha das classificões, contendo
 * informações relativas à posição da equipa, bem como número de partidas jogadas, vitórias, empates, derrotas, golos e pontos.
 * 
 * @param {*} props recebe qualquer tipo de variável, um title que pode ser true ou false, e indica se a linha é um título ou 
 * uma linha de classificação. Recebe também um data que representa um objeto que contém todas as informações a apresentar ao 
 * utilizador
 * @returns div que contém uma linha da tabela classificativa
 */
function StandingsLine(props) {

      if(props.title === "true") {
        return(
            <div className="standingLine title">
                  <div className="position title">
                    <Tooltip title="Posição" placement="bottom">
                      <span>#</span>
                    </Tooltip>
                  </div>
                  <div className="teamInfo">
                    
                      <div className="teamName title">
                      <Tooltip title="Equipa" placement="bottom">
                          <span>Equipa</span>
                        </Tooltip>
                      </div>
                  </div>
                  <div className="statsMenu title">
                    <div className="matchesPlayed">
                    <Tooltip title="Partidas Jogadas" placement="bottom">
                      <span>PJ</span>
                    </Tooltip>
                    </div>
                    <div className="wins">
                    <Tooltip title="Vitórias" placement="bottom">
                      <span>V</span>
                    </Tooltip>
                    </div>
                    <div className="draws">
                    <Tooltip title="Empates" placement="bottom">
                      <span>E</span>
                    </Tooltip>
                    </div>
                    <div className="losses">
                    <Tooltip title="Derrotas" placement="bottom">
                      <span>D</span>
                    </Tooltip>
                    </div>
                    <span className="goals">
                    <Tooltip title="Golos" placement="bottom">
                      <span>G</span>
                    </Tooltip>
                    </span>
                    <span className="points">
                    <Tooltip title="Pontos" placement="bottom">
                      <span>P</span>
                    </Tooltip>
                    </span>
                </div>
            </div>
        )
      } else {
        const data = props.data

        return(
            <div className="standingLine">
                  <span className="position">{data.overall_League_Position}</span>
                  <div className="teamInfo">
                      <img className="teamBadge" src={data.team_Badge} alt="Team Badge" />
                      <span className="teamName">{data.team_Name}</span>
              </div>
                <div className="statsMenu">
                  <span className="matchesPlayed">{data.overall_League_Payed}</span>
                  <span className="wins">{data.overall_League_W}</span>
                  <span className="draws">{data.overall_League_D}</span>
                  <span className="losses">{data.overall_League_L}</span>
                  <span className="goals">{data.overall_League_GF}:{data.overall_League_GA}</span>
                  <span className="points">{data.overall_League_PTS}</span>
                </div>
                
            </div>
        )
      }
}

export default StandingsLine;
