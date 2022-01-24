import "./Chat.css";
import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import jwt from "jwt-decode";
import { GiAcousticMegaphone } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

/**
 * Componente principal do chat, onde se irão estabelecer as conexões ao backend
 * @param {*} props recebe qualquer tipo de dados
 * @returns uma janela com o chat total
 */
function Chat(props) {
  const [hubConnection, setHubConnection] = useState();
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [rank, setRank] = useState({});
  const latestChat = useRef(null);

  let user = {
    id: "",
    name: "",
    role: ""
  }

  if(localStorage.getItem('isLogged')){
  user = jwt(localStorage.getItem("app-token"));
    }

  latestChat.current = messageList;

  const getUser = () => {
    axios.get(`https://localhost:7261/api/user/${user.id}`).then((res) => {
      user = res.data;
      setRank(user.rank);
    });
  };

  useEffect(() => {
    createHubConnection();
    getUser();
  }, []);

  const createHubConnection = async () => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7261/chat")
      .build();
    try {
      await hubConnection.start();
      console.log("connected!");
    } catch (e) {
      console.log("Error", e);
    }
    setHubConnection(hubConnection);
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (message) => {
        const updatedChat = [...latestChat.current];
        updatedChat.push(message);
        setMessageList(updatedChat);
      });
    }
  }, [hubConnection]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      User: user,
      Message: message,
      Rank: rank,
    };
    try {
      await hubConnection.send("SendMessage", chatMessage);
    } catch (e) {
      console.log(e);
    }
  };

  return props.trigger ? (
    <>
      <div className="chat">
        <span className="chat-title"> LIVE CHAT </span>
        <div className="chat-container">
          {messageList.map((msg, index) => {
            return (
              <div className="message-container" key={index}>
                <div className="icon-container">
                  <FaUserCircle className="user-icon" />
                </div>
                <div className="message-details">
                  <div className="user-details" >
                    <div className="user"> {msg.user} </div>
                    <div className="rank"> Rank: {msg.rank} </div>
                    <button className="rep-button">
                      <GiAcousticMegaphone />
                    </button>
                  </div>
                  <div className="message">{msg.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-area">
          <input
            className="messageInput"
            placeholder="Escreva aqui a sua mensagem"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="botao"
            onClick={() => sendMessage(user.name, text)}
          >
            {" "}
            Enviar Mensagem{" "}
          </button>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

export default Chat;
