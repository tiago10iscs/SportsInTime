import "./styles.css";

import GraphBars from "./GraphBars";
import Axios from "axios";

/**
 * Representa as aposta do tipo 2 way bet, ou seja, que tenha duas opções de resposta.
 * Neste caso, as aposta em ambas marcam e em over/under 2.5 golos.
 *
 * @param {*} props podem ser de qualquer tipo, neste caso recebem os valores das apostas, bem como
 * a informação do voto do utilizador
 * @returns um div com dois botões e as respetivas barras gráficas relativas à percentagem de respostas
 */
function GraphLine(props) {
  const firstValue = parseInt(props.firstValue, 10);
  const secondValue = parseInt(props.secondValue, 10);

  const total = firstValue + secondValue;
  const firstPercent = Math.round((firstValue / total) * 100).toString() + "%";
  const secondPercent =
    Math.round((secondValue / total) * 100).toString() + "%";

  let vote1 = false;
  let vote2 = false;

  if (props.hasVoted) {
    switch (props.vote) {
      case "1":
        vote1 = true;
        break;
      case "2":
        vote2 = true;
        break;
      default:
        break;
    }
  }

  const voteYes = () => {
    const values = {
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 0,
      opcaoGolos: 0,
      opcaoBTTS: 1
    }
    Axios.post("https://localhost:7261/api/Livebet", values)
          .then(() =>{
            props.setSubmit(!props.submit)
          })
      
  };

  const voteNo = () => {
    const values = {
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 0,
      opcaoGolos: 0,
      opcaoBTTS: 2
    }
    Axios.post("https://localhost:7261/api/Livebet", values)
          .then(() =>{
            props.setSubmit(!props.submit)
          })
      
  };

  const voteOver = () => {
    const values = {
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 0,
      opcaoGolos: 1,
      opcaoBTTS: 0
    }
    Axios.post("https://localhost:7261/api/Livebet", values)
          .then(() =>{
            props.setSubmit(!props.submit)
          })
      
  };

  const voteUnder = () => {
    const values = {
      match_Id: props.id,
      userID: props.user.id,
      opcaoVitoria: 0,
      opcaoGolos: 2,
      opcaoBTTS: 0
    }
    Axios.post("https://localhost:7261/api/Livebet", values)
          .then(() =>{
            props.setSubmit(!props.submit)
          })
      
  };

  if (props.title === "Ambas Marcam") {
    return (
      <div className="statsContainer">
        <span className="title">{props.title.toUpperCase()}</span>
        <div className="statsBox">
          <GraphBars value={firstPercent} percent={firstPercent} option="1" />
          <GraphBars value={secondPercent} percent={secondPercent} option="2" />
        </div>
        <div className="betButtons">
          <button
            disabled={vote1}
            className="BOption"
            onClick={() => voteYes()}
          >
            {props.option1}
          </button>
          <button disabled={vote2} className="BOption" onClick={() => voteNo()}>
            {props.option2}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="statsContainer">
        <span className="title">{props.title.toUpperCase()}</span>
        <div className="statsBox">
          <GraphBars value={firstPercent} percent={firstPercent} option="1" />
          <GraphBars value={secondPercent} percent={secondPercent} option="2" />
        </div>
        <div className="betButtons">
          <button
            disabled={vote1}
            className="BOption"
            onClick={() => voteOver()}
          >
            {props.option1}
          </button>
          <button
            disabled={vote2}
            className="BOption"
            onClick={() => voteUnder()}
          >
            {props.option2}
          </button>
        </div>
      </div>
    );
  }
}

export default GraphLine;
