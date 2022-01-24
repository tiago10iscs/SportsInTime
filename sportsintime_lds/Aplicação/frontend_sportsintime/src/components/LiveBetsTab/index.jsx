import "./styles.css";

import GraphLine from "./GraphLine";
import ThreeWayBet from "./ThreeWayBet";
import Axios from "axios";

import { useState, useEffect } from "react";
import jwt from "jwt-decode";

/**
 * Este componente representa a aba de livebets, que será inserida na página de jogo.
 * Através desta aba o utilizador poderá efetuar previsões em direto, que poderão ser alteradas
 * ao longo do jogo
 *
 * @param {*} props pode ser de qualquer tipo, neste caso representa o id de jogo e o trigger
 * que permite ativar e desativar a aba
 * @returns uma div com a aba de live bets
 */
function LiveBetsTab(props) {
  let userResult = { hasVoted: false, vote: "" };
  let userBtts = { hasVoted: false, vote: "" };
  let userOver = { hasVoted: false, vote: "" };
  const user = jwt(localStorage.getItem("app-token"));

  const [submit, setSubmit] = useState(false)
  const [userLiveBets, setUserLiveBets] = useState([]);
  const [livebets_data, setLiveBetsData] = useState([]);

  const getData = () => {
    Axios.get(
      `https://localhost:7261/api/Livebet/gameLivebets?Match_Id=${props.id}`
    ).then((res) => {
      const bets = res.data;
      setLiveBetsData(bets);
    });
  };

  const getUserLiveBets = () => {
    Axios.get(
      `https://localhost:7261/api/Livebet/userliveBet?userId=${user.id}&Match_id=${props.id}`
    ).then((res) => {
      const userBets = res.data;
      setUserLiveBets(userBets);
    });
  };

  const getAllData = () => {
    getData()
    getUserLiveBets()
  }

  useEffect(() => {
    getAllData()
    setInterval(getAllData, 1000);
    // eslint-disable-next-line
  }, []);

  userLiveBets.forEach((element) => {
    if (element.type === 1) {
      userResult = {
        hasVoted: element.hasVoted,
        vote: element.vote,
      };
    } else if (element.type === 2) {
      userBtts = {
        hasVoted: element.hasVoted,
        vote: element.vote,
      };
    } else if (element.type === 3) {
      userOver = {
        hasVoted: element.hasVoted,
        vote: element.vote,
      };
    }
  });

  let result = {
    firstValue: 0,
    secondValue: 0,
    thirdValue: 0,
  };

  let btts = {
    firstValue: 0,
    secondValue: 0,
  };

  let over = {
    firstValue: 0,
    secondValue: 0,
  };

  livebets_data.forEach((element) => {
    if (element.type === 1) {
      result = {
        firstValue: element.firstValue,
        secondValue: element.secondValue,
        thirdValue: element.thirdValue,
      };
    } else if (element.type === 2) {
      btts = {
        firstValue: element.firstValue,
        secondValue: element.secondValue,
      };
    } else if (element.type === 3) {
      over = {
        firstValue: element.firstValue,
        secondValue: element.secondValue,
      };
    }
  });

  return props.trigger ? (
    <div className="container">
      <div className="statsContainer">
        <ThreeWayBet
          title="1 X 2"
          firstValue={result.firstValue}
          secondValue={result.secondValue}
          thirdValue={result.thirdValue}
          option1="1"
          option2="X"
          option3="2"
          hasVoted={userResult.hasVoted}
          vote={userResult.vote}
          user={user}
          id={props.id}
          submit={submit}
          setSubmit={setSubmit}
        />
        <GraphLine
          title="Ambas Marcam"
          firstValue={btts.firstValue}
          secondValue={btts.secondValue}
          option1="Sim"
          option2="Não"
          hasVoted={userBtts.hasVoted}
          vote={userBtts.vote}
          user={user}
          id={props.id}
          submit={submit}
          setSubmit={setSubmit}
        />
        <GraphLine
          title="Over/Under 2.5 Golos"
          firstValue={over.firstValue}
          secondValue={over.secondValue}
          option1="Over"
          option2="Under"
          hasVoted={userOver.hasVoted}
          vote={userOver.vote}
          user={user}
          id={props.id}
          submit={submit}
          setSubmit={setSubmit}
        />
      </div>
    </div>
  ) : (
    ""
  );
}

export default LiveBetsTab;
