import "./index.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from 'axios'
import ChangePasswordMenu from "../../components/ChangePasswordMenu";
import DeleteUserMenu from "../../components/DeleteUserMenu";

/**
 * Componente que permite gerar a página de perfil de um utilizador
 * @returns uma div com a os elementos constituintes da página de perfil do User.
 */
function ProfilePage() {
  const location = useLocation();
  const {id} = location.state;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [changePW, setChangePW] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)

  const points = data.rank

  const calcRank = () => {
    switch(true) {
      case (points < 100):
        return "0"
      case (points < 500):
        return "1"
      case points < 2000:
        return "2"
      case points < 4500:
        return "3"
      case points < 6500:
        return "4"
      case points < 8500:
        return "5"
      case points < 11000:
        return "6"
      case points < 13000:
        return "7"
      case points < 15000:
        return "8"
      case points < 17000:
        return "9"
      case points > 17000:
        return "10"
      default:
        return "0"
    }
  }

  useEffect(() => {
    Axios.get(`https://localhost:7261/api/user/${id}`).then(res => {
      const userData = res.data
      setData(userData);
      setLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return <div />;
  }

  return(
    <>
    <main>
      <div className="profile-page">
        <div className="user-content">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg"
            alt="User"
            className="user-image"
          />
          <span className="profile-name">{data.name}</span>
          <span className="email">{data.email}</span>
        </div>
        <div className="classification">
          <div className="rank-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Blue_Star.svg"
              alt={data.rank}
            />
          </div>
          <div className="user-rank">
            <span> {calcRank(data.points)}</span>
          </div>
          <div className="user-points">
            <span> {data.rank} PONTOS</span>
          </div>
        </div>
        <div className="buttons">
          <button className="change-passwordBtt" onClick={() => setChangePW(true)} > Alterar Palavra Passe </button>
          <button className="delete-accountBtt" onClick={() => setDeleteUser(true)} > Eliminar Conta </button>
        </div>
      </div>
    </main>
      <ChangePasswordMenu trigger={changePW} setTrigger={setChangePW} id={id} />
      <DeleteUserMenu trigger={deleteUser} setTrigger={setDeleteUser} id={id} />
    </>
  );
}

export default ProfilePage;
