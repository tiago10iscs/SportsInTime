import React from "react";
import "./styles.css";

import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserMenu(props) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (props.user.role === "User" || props.user.role === "Admin") {
    return (
      <div className="buttonMenu">
        <div className="userBar">
          <FaUserCircle className="usericon" />
          <Link
            style={{ textDecoration: "none" }}
            to={`/profile/${props.user.id}`}
            state={{
              id: props.user.id,
            }}
          >
            <div className="username">{props.user.name}</div>
          </Link>
        </div>
        <button onClick={() => logout()}> LOGOUT </button>
      </div>
    );
  } else {
    return (
      <div className="buttonMenu">
        <button onClick={() => props.setLogin(true)}> LOGIN </button>
        <button onClick={() => props.setRegisto(true)}> REGISTO </button>
      </div>
    );
  }
}

export default UserMenu;
