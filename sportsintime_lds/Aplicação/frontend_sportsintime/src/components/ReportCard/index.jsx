import React, { useEffect, useState } from "react";
import "./styles.css";

import { FaUserCircle } from "react-icons/fa";
import Axios from "axios";

/**
 * Este componente representa um report que é utilizado na lista de reports, apresentada aos admins na admin dashboard
 *
 * @param {*} props recebe qualquer tipo de variável, neste caso a informação do report
 * @returns retorna uma div que contém a informação do report
 */
function ReportCard(props) {
  const [user, setUser] = useState({ name: "" });
  const data = props.data;

  const getUser = () => {
    Axios.get(`https://localhost:7261/api/user/${data.idUser}`).then((res) => {
      const user = res.data;
      console.log(user);
      setUser(user);
    });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="reportContainer">
      <div className="box message">
        <span className="reportTitle message">Mensagem</span>
        <div className="messageBox">
          <span className="messageText"> {data.mensagem} </span>
        </div>
      </div>
      <div className="reportInfo">
        <div className="box user">
          <span className="reportTitle user">Utilizador</span>
          <div className="userBox">
            <FaUserCircle className="usericon" />
            <span className="userName">{user.name}</span>
          </div>
        </div>
        <div className="box actions">
          <span className="reportTitle actions">Ações</span>
          <div className="buttonBox">
            <button className="verifiedButton" onClick={() => props.verified()}>
              {" "}
              Marcar como verificado{" "}
            </button>
            <button className="banButton" onClick={() => props.banned()}>
              {" "}
              Banir utilizador{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;
