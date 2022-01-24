import React from "react";
import "../styles.css";

import { a } from "./a";
import { u } from "./u";
import { g } from "./g";

function SidebarData(props) {
  if (props.r === "Admin") {
    return a.map((item, index) => {
      return (
        <a className="sbField" href={item.path} key={index}>
          {" "}
          {item.title}{" "}
        </a>
      );
    });
  } else if (props.r === "User") {
    return u.map((item, index) => {
      return (
        <a className="sbField" href={item.path} key={index}>
          {" "}
          {item.title}{" "}
        </a>
      );
    });
  } else {
    return g.map((item, index) => {
      if (item.title === "Login") {
        return (
          <span
            className="sbField"
            key={index}
            onClick={() => props.setLogin()}
          >
            {" "}
            {item.title}{" "}
          </span>
        );
      } else if (item.title === "Registo") {
        return (
          <span
            className="sbField"
            key={index}
            onClick={() => props.setRegisto()}
          >
            {" "}
            {item.title}{" "}
          </span>
        );
      } else {
        return (
          <a className="sbField" href={item.path} key={index}>
            {" "}
            {item.title}{" "}
          </a>
        );
      }
    });
  }
}

export default SidebarData;
