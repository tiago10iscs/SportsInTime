import "./index.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios"

import StatsTab from '../../components/StatsTab'
import LineupsTab from '../../components/LineupsTab'
import LiveBetsTab from '../../components/LiveBetsTab'
import ChatTab from '../../components/ChatTab/Chat'


/**
 * Função que permite gerar a página de jogo, onde irá mostrar informações como: Nome das equipas, resultado, tempo de jogo e 4 botoes
 * que irão permitir navegar através das diferentes abas
 * @returns uma página de jogo
 */
function GamePage(props) {

  const location = useLocation();
  const [data, setdata] = useState({});
  const {id} = location.state;
  const [trigger, setTrigger] = useState({
    stats: true,
    lineups: false,
    liveBets: false,
    chat: false
  })

  let style = [
    {
      display:"none"
    },
    {
      display:"none"
    },
    {
      display:"none"
    },
    {
      display:"none"
    }
  ]

  const getData = () => {
    Axios.get(`https://localhost:7261/api/jogo/${id}`)
      .then(res => {
        const match_details = res.data;
        setdata(match_details);
      })
  }
  useEffect(() =>{
    getData();
    setInterval(getData, 45000);
    // eslint-disable-next-line
  }, []);

  const stats = () => {
    setTrigger({
      stats: true,
      lineups: false,
      liveBets: false,
      chat: false
    })
  }

  const lineups = () => {
    setTrigger({
      stats: false,
      lineups: true,
      liveBets: false,
      chat: false
    })
  }

  const livebets = () => {
    setTrigger({
      stats: false,
      lineups: false,
      liveBets: true,
      chat: false
    })
  }

  const chat = () => {
    setTrigger({
      stats: false,
      lineups: false,
      liveBets: false,
      chat: true
    })
  }

  if(data.estado === 0) {
    style = [
      {},
      {},
      {},
      {}
    ]
  } else if(data.estado === 1) {
    style = [
      {},
      {},
      {
        display:"none"
      },
      {
        display:"none"
      }
    ]
  }

  const time = (status, time) => {
    if(status === 1) {
      return "Terminado"
    } else if(status === 2) {
      return ""
    } else if(status === 3) {
      return "Adiado"
    } else {
      return time
    }
  }
  
  return (
    <div className="GamePage">
      <div className="GameResult">
        <div className="time">{time(data.estado, data.match_Status)}</div>
        <div className="event-global">
          <div className="homeTeam">
            <div className="name"><span>{data.match_Hometeam_Name}</span></div>
            <img
              src={data.team_Home_Badge}
              className="teamLogo"
              alt={data.match_Hometeam_Name}
            /></div>
          <div className="match_result">
            {data.match_Hometeam_Score} - {data.match_Awayteam_Score}
          </div>
          <div className="awayTeam">
            <div className="name"><span>{data.match_Awayteam_Name}</span></div>
            <img
              src={data.team_Away_Badge}
              className="teamLogo"
              alt={data.match_Awayteam_Name}
            /></div>
        </div>
      </div>
      <div className="buttonsGamePage">
        <button style={style[0]} className="button" type="button" onClick={() => stats()}>
          Estatísticas
        </button>
        <button style={style[1]} className="button" type="button" onClick={() => lineups()}>
          Formações
        </button>
        <button disabled={!props.isLogged} style={style[2]}  className="button" type="button" onClick={() => livebets()}>
          Live Bets
        </button>
        <button disabled={!props.isLogged} style={style[3]}  className="button" type="button" onClick={() => chat()}>
          Live Chat
        </button>
      </div>
      <div className="tabsBox">
        <StatsTab trigger={trigger.stats} id={id} />
        <LineupsTab trigger={trigger.lineups} id={id} />
        <LiveBetsTab trigger={trigger.liveBets} id={id} />
        <ChatTab trigger = {trigger.chat}/>
      </div>
    </div>
  );
}

export default GamePage;
