import React, { useState, useEffect } from "react";
import "./styles.css";
import GameState from "./GameState";
import Axios from "axios";
import { Link } from "react-router-dom";
import PredictMenu from "../PredictMenu";
import jwt from "jwt-decode";

/**
 * Componente que permite gerar a lista dos jogos, fazendo um pedido GET ao Back-end
 * @param {*} props - recebe qualquer tipo de variavel, neste caso os filtros da partida (live ou all)
 * @returns uma div com todos os jogos disponiveis, dentro de um intervalo de tempo, e com todas as suas informações
 */
function GameList(props) {
  const [games, setgames] = useState([]);
  const [predictData, setpredictData] = useState([]);

  const getGames = () => {
    Axios.get("https://localhost:7261/api/jogo").then((res) => {
      const games = res.data;
      if (props.date !== "") {
        todayGamesFilter(games);
      } else {
        setgames(games);
      }
    });
  };

  const getUserPredicts = () => {
    if (localStorage.getItem("isLogged")) {
      const user = jwt(localStorage.getItem("app-token"));
      console.log(user);
      Axios.get(`https://localhost:7261/api/resposta/predicts/${user.id}`).then(
        (res) => {
          const userPredicts = res.data;
          setpredictData(userPredicts);
        }
      );
    }
  };
  /* Obtem todos os jogos de 45 em 45 segundos */
  useEffect(() => {
    getUserPredicts();
    getGames();
    setInterval(getGames, 45000);
    // eslint-disable-next-line
  }, []);

  const todayGamesFilter = (gamesArray) => {
    const today_games = [];
    // eslint-disable-next-line
    gamesArray.map((games) => {
      if (props.date === games.match_Date) {
        today_games.push(games);
      }
    });
    setgames(today_games);
  };

  if (props.filter === "l") {
    let counter = 0;

    const data = games.map((matchDetail, index) => {
      if (
        matchDetail.match_Live === "1" &&
        matchDetail.match_Status !== "Finished"
      ) {
        counter++;
        let matchTime = "";
        if (
          matchDetail.match_Live === "1" &&
          matchDetail.match_Status !== "Finished"
        ) {
          matchTime = matchDetail.match_Status + "'";
        }
        return (
          <Link
            key={index}
            style={{ textDecoration: "none" }}
            to={`/game-page/${matchDetail.match_Id}`}
            state={{
              id: matchDetail.match_Id,
            }}
          >
            <div className="events">
              <GameState
                state={matchDetail.estado}
                date={matchDetail.match_Date}
                time={matchDetail.match_Time}
              />
              <div className="event_global">
                <div className="event_homeTeam_name">
                  {matchDetail.match_Hometeam_Name}
                </div>
                <div className="result">
                  {matchDetail.match_Hometeam_Score} -{" "}
                  {matchDetail.match_Awayteam_Score}
                </div>
                <div className="event_awayTeam_name">
                  {matchDetail.match_Awayteam_Name}
                </div>
              </div>
              <div className="event_time">{matchTime}</div>
              <div className="HalfGoals">
                <span>Resultado ao Intervalo</span>
                <span>
                  {matchDetail.match_Hometeam_Halftime_Score} -{" "}
                  {matchDetail.match_Awayteam_Halftime_Score}
                </span>
              </div>
            </div>
          </Link>
        );
      } else {
        return <div key={index} />;
      }
    });

    if (counter === 0) {
      return (
        <span className="emptyLive">
          {" "}
          De momento não existem jogos em direto{" "}
        </span>
      );
    } else {
      return <div className="gamesList">{data}</div>;
    }
  }
  return (
    <div className="gamesList">
      {games.map((matchDetail, index) => {
        let matchTime = "";
        if (
          matchDetail.match_Live === "1" &&
          matchDetail.match_Status !== "Finished"
        ) {
          matchTime = matchDetail.match_Status + "'";
        }

        if (matchDetail.estado === 2) {
          let predict = null;

          predictData.forEach((element) => {
            if (element.matchId.toString() === matchDetail.match_Id) {
              predict = element;
            }
          });

          return (
            <Link
              key={index}
              style={{ textDecoration: "none" }}
              to={`/game-page/${matchDetail.match_Id}`}
              state={{
                id: matchDetail.match_Id,
              }}
            >
              <div className="events" key={index}>
                <GameState
                  state={matchDetail.estado}
                  date={matchDetail.match_Date}
                  time={matchDetail.match_Time}
                />
                <div className="event_global">
                  <div className="homeTeam_name">
                    {matchDetail.match_Hometeam_Name}
                  </div>
                  <div className="result">
                    {matchDetail.match_Hometeam_Score} -{" "}
                    {matchDetail.match_Awayteam_Score}
                  </div>
                  <div className="awayTeam_name">
                    {matchDetail.match_Awayteam_Name}
                  </div>
                </div>
                <div className="predict_box">
                  <PredictMenu
                    hasVoted={predict}
                    matchId={matchDetail.match_Id}
                  />
                </div>
              </div>
            </Link>
          );
        } else {
          return (
            <Link
              key={index}
              style={{ textDecoration: "none" }}
              to={`/game-page/${matchDetail.match_Id}`}
              state={{
                id: matchDetail.match_Id,
              }}
            >
              <div className="events" key={index}>
                <GameState
                  state={matchDetail.estado}
                  date={matchDetail.match_Date}
                  time={matchDetail.match_Time}
                />
                <div className="event_global">
                  <div className="event_homeTeam_name">
                    {matchDetail.match_Hometeam_Name}
                  </div>
                  <div className="result">
                    {matchDetail.match_Hometeam_Score} -{" "}
                    {matchDetail.match_Awayteam_Score}
                  </div>
                  <div className="event_awayTeam_name">
                    {matchDetail.match_Awayteam_Name}
                  </div>
                </div>
                <div className="event_time">{matchTime}</div>
                <div className="HalfGoals">
                  <span>Resultado ao Intervalo</span>
                  <span>
                    {matchDetail.match_Hometeam_Halftime_Score} -{" "}
                    {matchDetail.match_Awayteam_Halftime_Score}
                  </span>
                </div>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
export default GameList;
