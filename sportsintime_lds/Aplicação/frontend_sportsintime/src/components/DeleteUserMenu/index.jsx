import "./styles.css";
import axios from "axios";

/**
 * O componente DeleteUserMenu representa o componente que é apresentado ao utilizador quando este tenta eliminar a sua conta.
 * O menu pede ao utilizador para confirmar a ação de eliminar utilizador.
 *
 * @param {*} props pode ser de qualquer tipo, nexte caso é um trigger que permite atiuvar e desativar o popup, e a função
 * setTrigger que permite alterar o estado do trigger. Para além disso recebe o id do utilizador atual
 * @returns uma div com o menu de eliminação da conta
 */
function DeleteUserMenu(props) {
  const deleteUser = () => {
    axios
      .delete(`https://localhost:7261/api/user/${props.id}`)
      .then(() => {
        localStorage.removeItem("app-token");
        localStorage.removeItem("isLogged");
        window.alert("Utilizador eliminado com sucesso!");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "User not found") {
          window.alert("Utilizador não foi encontrado");
        }
      });
  };

  return props.trigger ? (
    <div className="popup">
      <div className="deleteUserContainer">
        <div className="topBarDelete">
          <span className="deleteUserTitle"> ELIMINAR UTILIZADOR </span>
        </div>
        <div className="deleteUserConfirm">
          <span className="deleteText">
            {" "}
            Tem a certeza que quer eliminar a sua conta{" "}
          </span>
          <div className="deleteButtons">
            <button className="btn-deleteUser" onClick={() => deleteUser()}>
              {" "}
              Sim{" "}
            </button>
            <button
              className="btn-deleteUser"
              onClick={() => props.setTrigger(false)}
            >
              {" "}
              Não{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeleteUserMenu;
