import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function NavMenu(props) {
  if (props.r === "Admin") {
    return (
      <div className="adminTitle">
        <div className="adminTitle">PÁGINA DE ADMINISTRAÇÃO</div>
      </div>
    );
  } else {
    return (
      <div className="navMenu">
        <Link to="/matchs/today" className="menuItem">
          {" "}
          JOGOS DO DIA{" "}
        </Link>
        <Link to="/standings" className="menuItem">
          {" "}
          CLASSIFICAÇÕES{" "}
        </Link>
      </div>
    );
  }
}

export default NavMenu;
