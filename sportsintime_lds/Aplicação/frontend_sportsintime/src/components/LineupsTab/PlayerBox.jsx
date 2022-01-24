import React from "react";

function PlayerBox(props) {
  var data;

  if (props.team === "home") {
    if (props.type === "titulares") {
      data = props.data.home.titulares;
    } else {
      data = props.data.home.substitutos;
    }
  } else {
    if (props.type === "titulares") {
      data = props.data.away.titulares;
    } else {
      data = props.data.away.substitutos;
    }
  }

  return (
    <div className="playerBoxContainer">
      {data.map((player, index) => {
        if (props.team === "home") {
          if (player.isGR) {
            return (
              <div className="playerDiv home" key={index}>
                <span className="number">{player.player_number}</span>
                <span className="player_name">{player.player_name}</span>
                <span className="tag"> (GR) </span>
              </div>
            );
          } else {
            return (
              <div className="playerDiv home" key={index}>
                <span className="number">{player.player_number}</span>
                <span className="player_name">{player.player_name}</span>
                <span className="tag"></span>
              </div>
            );
          }
        } else {
          if (player.isGR) {
            return (
              <div className="playerDiv away" key={index}>
                <span className="tag"> (GR) </span>
                <span className="player_name">{player.player_name}</span>
                <span className="number">{player.player_number}</span>
              </div>
            );
          } else {
            return (
              <div className="playerDiv away" key={index}>
                <span className="player_name">{player.player_name}</span>
                <span className="number">{player.player_number}</span>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

export default PlayerBox;
