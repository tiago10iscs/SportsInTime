import "./styles.css";
import React from "react";
import Axios from "axios";
import jwt from "jwt-decode";

/**
 * Este componente representa o menu de previsões que é utilizado na gameList.
 * Através deste menu, o utilizador pode fazer a sua previsão para o jogo no modo 3-bet way (euipa da casa, empate, equipa visitante)
 *
 * @param {*} props pode ser de qualquer tipo, neste caso recebe um objeto que contém o id do jogo e a
 * resposta que o utilizador deu na sondagem. Caso este parâmetro seja null será apresentado o menu para o utilizador efetuar
 * a previsão, caso contrário irá aparecer um menu com a previsão já escolhida pelo utilizador para este jogo.
 * @returns div com o menu de previsões
 */
function PredictMenu(props) {
  let user = {};
  if (localStorage.getItem("isLogged")) {
    user = jwt(localStorage.getItem("app-token"));
  }

  const homeWin = () => {
    const value = {
      matchId: props.matchId,
      idUser: user.id,
      resposta: 1,
    };
    Axios.post("https://localhost:7261/api/resposta", value).then(() => {
      window.alert(
        "A sua previsão para este jogo foi guardada com sucesso! \nVocê escolheu a equipa da casa para vencer."
      );
    });
  };

  const draw = () => {
    Axios.post("https://localhost:7261/api/resposta", {
      matchId: props.matchId,
      idUser: user.id,
      resposta: 2,
    }).then(() => {
      window.alert(
        "A sua previsão para este jogo foi guardada com sucesso! \nVocê escolheu o empate na partida."
      );
    });
  };

  const awayWin = () => {
    Axios.post("https://localhost:7261/api/resposta", {
      matchId: props.matchId,
      idUser: user.id,
      resposta: 3,
    })
      .then(() => {
        window.alert(
          "A sua previsão para este jogo foi guardada com sucesso! \nVocê escolheu a equipa visitante para vencer."
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getVote = (predict) => {
    switch (predict) {
      case 1:
        return "1";
      case 2:
        return "X";
      case 3:
        return "2";
      default:
        return "?";
    }
  };

  if (localStorage.getItem("isLogged")) {
    if (props.hasVoted !== null) {
      return (
        <div className="votedBox">
          <div className="hasVoted">Previsão já efetuada</div>
          <div className="predict">
            Previsão:{" "}
            <span className="answer">{getVote(props.hasVoted.vote)}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="predict_container">
          <div className="predict_title">Previsão</div>
          <div className="predict_buttons">
            <button className="predict_button" onClick={() => homeWin()}>
              1
            </button>
            <button className="predict_button" onClick={() => draw()}>
              X
            </button>
            <button className="predict_button" onClick={() => awayWin()}>
              2
            </button>
          </div>
        </div>
      );
    }
  } else {
    return <div className="noLog" />;
  }
}

export default PredictMenu;
