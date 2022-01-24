import React, { useState } from "react";

import "./styles.css";

import UserMenu from "./UserMenu";
import NavMenu from "./NavMenu";
import SidebarData from "./SidebarData/SidebarData";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";

import LoginPopup from "../LoginPopup";
import RegistoPopup from "../RegistoPopup";

/**
 * Este compoenete é a barra de navegação do website.
 * Apartir daqui o utilizador pode navegar pelas diversas páginas do site, bem como utilizar os botões de login e registo
 *
 * @returns div que integra todos os componentes da barra de navegação
 */
function Navbar() {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registoPopup, setRegistoPopup] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  let user = {
    id: "",
    name: "",
    role: "",
  };
  if (localStorage.getItem("isLogged")) {
    user = jwt(localStorage.getItem("app-token"));
  }

  const role = user.role;

  const loginToRegisto = () => {
    setLoginPopup(false);
    setRegistoPopup(true);
  };

  const registoToLogin = () => {
    setRegistoPopup(false);
    setLoginPopup(true);
  };

  const showSideBar = () => setSidebar(!sidebar);

  const loginOnSideBar = () => {
    setSidebar(false);
    setLoginPopup(true);
  };

  const registoOnSideBar = () => {
    setSidebar(false);
    setRegistoPopup(true);
  };

  return (
    <>
      <main>
        <div className="nav">
          <Link to="/">
            <img
              className="logo"
              src="https://i.imgur.com/HLQUIQ0.png"
              alt="logo"
              href="/"
            />
          </Link>
          <NavMenu r={role} />
          <UserMenu
            className="userMenu12"
            user={user}
            setLogin={setLoginPopup}
            setRegisto={setRegistoPopup}
          />
          <div className="bars">
            <FaBars className="iBars" onClick={showSideBar} />
          </div>

          <div className={sidebar ? "side-bar active" : "side-bar"}>
            <span className="closebtn" onClick={showSideBar}>
              &times;
            </span>
            <SidebarData
              r={role}
              setLogin={loginOnSideBar}
              setRegisto={registoOnSideBar}
            />
          </div>
        </div>
      </main>
      <LoginPopup
        trigger={loginPopup}
        setTrigger={setLoginPopup}
        setRegisto={loginToRegisto}
      />
      <RegistoPopup
        trigger={registoPopup}
        setTrigger={setRegistoPopup}
        setLogin={registoToLogin}
      />
    </>
  );
}

export default Navbar;
