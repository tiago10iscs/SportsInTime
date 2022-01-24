import React from "react";
import "./styles.css";
import PlayerBox from "./PlayerBox";

function LineupContainer(props) {
  if (props.estado === 2 || props.estado === 3) {
    return <div />;
  } else {
    switch (props.type) {
      case "inicial":
        return (
          <div className="lineupContainer">
            <div className="homeTeamLineup">
              <div className="system home">
                <span className="systemTitle">Formação Tática:</span>
                <span className="systemText">
                  {props.data.match_Hometeam_System}
                </span>
              </div>
              <PlayerBox data={props.data} type="titulares" team="home" />
            </div>
            <div className="awayTeamLineup">
              <div className="system away">
                <span className="systemTitle">Formação Tática:</span>
                <span className="systemText">
                  {" "}
                  {props.data.match_Awayteam_System}{" "}
                </span>
              </div>
              <PlayerBox data={props.data} type="titulares" team="away" />
            </div>
          </div>
        );
      case "suplentes":
        return (
          <div className="lineupContainer">
            <div className="homeTeamLineup">
              <PlayerBox data={props.data} type="suplentes" team="home" />
            </div>
            <div className="awayTeamLineup">
              <PlayerBox data={props.data} type="suplentes" team="away" />
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }
}

export default LineupContainer;
