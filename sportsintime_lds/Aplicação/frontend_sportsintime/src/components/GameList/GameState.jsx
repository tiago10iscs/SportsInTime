import React from "react";
import { FaRegDotCircle } from "react-icons/fa";
import "./styles.css";
/**
 * Componente relativo ao estado de um jogo, se está live ou não
 * @param {*} props recebe qualquer tipo de dados para puder ser usado ou reciclado noutro componente
 * @returns um estado especifico de um jogo assim como o seu icone quando é live
 */
function GameState(props) {
  let time = props.time.split(":");
  let newTime = new Date();
  newTime.setHours(time[0]);
  newTime.setMinutes(time[1]);
  newTime.setHours(newTime.getHours() - 1);
  const gameTime =
    String(newTime.getHours()).padStart(2, "0") +
    ":" +
    String(newTime.getMinutes()).padStart(2, "0");

  switch (props.state) {
    case 0:
      return (
        <div className="event_state">
          <FaRegDotCircle className="liveIcon" />
          <div className="state_live">{"LIVE"}</div>
        </div>
      );
    case 1:
      return (
        <div className="event_state">
          <div className="state">{"Terminado"}</div>
        </div>
      );
    case 2:
      return (
        <div className="event_state">
          <div className="state">
            <span>{props.date}</span>
            <span>{gameTime}</span>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="event_state">
          <div className="state">{"Adiado"}</div>
        </div>
      );
    default:
      return (
        <div className="event_state">
          <div className="state">
            <span>{props.date}</span>
            <span>{gameTime}</span>
          </div>
        </div>
      );
  }
}

export default GameState;
