import Axios  from "axios";
import { useState } from "react";
import userLiveBets from "../../userLiveBets";
import "./styles.css";

/**
 * Representa as aposta do tipo 3 way bet, ou seja, que tenha três opções de resposta.
 * Neste caso, as aposta no resultado final do jogo.
 *
 * @param {*} props podem ser de qualquer tipo, neste caso recebem os valores das apostas, bem como
 * a informação do voto do utilizador
 * @returns um div com três botões e os valores relativos à percentagem de respostas
 */
function ThreeWayBet(props) {
  const firstValue = parseInt(props.firstValue, 10);
  const secondValue = parseInt(props.secondValue, 10);
  const thirdValue = parseInt(props.thirdValue, 10);

  const total = firstValue + secondValue + thirdValue;
  const firstPercent = Math.round((firstValue / total) * 100).toString() + "%";
  const secondPercent =
    Math.round((secondValue / total) * 100).toString() + "%";
  const thirdPercent = Math.round((thirdValue / total) * 100).toString() + "%";


  let vote1 = false;
  let vote2 = false;
  let vote3 = false;

  if (props.hasVoted) {
    switch (props.vote) {
      case "1":
        vote1 = true;
        break;
      case "2":
        vote2 = true;
        break;
      case "3":
        vote3 = true;
        break;
      default:
        break;
    }
  }

  const voteHome = () => {
    const values = {
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 1,
      opcaoGolos: 0,
      opcaoBTTS: 0
    }
    Axios.post("https://localhost:7261/api/Livebet", values)
          .then(() =>{
            props.setSubmit(!props.submit)
          })
      
  };

  const voteDraw = () => {
    Axios.post("https://localhost:7261/api/Livebet",{
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 2,
      opcaoGolos: 0,
      opcaoBTTS: 0,
    });
  };

  const voteAway = () => {
    Axios.post("https://localhost:7261/api/Livebet",{
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 3,
      opcaoGolos: 0,
      opcaoBTTS: 0,
    });
  };

  return (
    <div className="statsContainer">
      <span className="title">{props.title.toUpperCase()}</span>
      <div className="bet3Buttons">
        <div className="option">
          <div className="optionValue">{firstPercent}</div>
          <button
            disabled={vote1}
            className="B3Option"
            onClick={() => voteHome()}
          >
            {props.option1}
          </button>
        </div>
        <div className="option">
          <div className="optionValue">{secondPercent}</div>
          <button
            disabled={vote2}
            className="B3Option"
            onClick={() => voteDraw()}
          >
            {props.option2}
          </button>
        </div>
        <div className="option">
          <div className="optionValue">{thirdPercent}</div>
          <button
            disabled={vote3}
            className="B3Option"
            onClick={() => voteAway()}
          >
            {props.option3}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreeWayBet;
