import "./styles.css";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

/**
 * O componente ChangePasswordMenu representa o componente que é apresentado ao utilizador quando este tenta alterar a
 * password da sua conta.
 * O menu pede ao utilizador para inserir a sua password atual, a password nova e confirmar a nova password.-+
 *
 * @param {*} props pode ser de qualquer tipo, nexte caso é um trigger que permite atiuvar e desativar o popup, e a função
 * setTrigger que permite alterar o estado do trigger. Para além disso recebe o id do utilizador atual
 * @returns uma div com o menu de eliminação da conta
 */
function ChangePasswordMenu(props) {
  const handleSubmit = (values) => {
    console.log(values);
    axios
      .put(`https://localhost:7261/api/user/changePassword/${props.id}`, values)
      .then(() => {
        localStorage.removeItem("app-token");
        localStorage.removeItem("isLogged");
        window.alert("Password alterada com sucesso!\nEfetue login novamente.");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "Wrong password") {
          window.alert("Password errada");
        }
      });
  };

  const validations = yup.object().shape({
    oldPassword: yup.string().min(8).required(),
    newPassword: yup.string().min(8).required(),
    confirmarPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "passwords do not match")
      .required(),
  });

  return props.trigger ? (
    <div className="popup">
      <div className="changePasswordContainer">
        <div className="topBarChangePW">
          <span className="changePasswordTitle"> ALTERAR PASSWORD </span>
          <span className="closeButton" onClick={() => props.setTrigger(false)}>
            {" "}
            &times;{" "}
          </span>
        </div>
        <Formik
          initialValues={{}}
          onSubmit={handleSubmit}
          validationSchema={validations}
        >
          <Form className="changePassword">
            <div className="changePassword-group">
              <span className="label-changePassword"> Password Atual </span>
              <Field
                type="password"
                name="oldPassword"
                className="campo-changePassword"
              />
              <ErrorMessage
                component="span"
                name="password"
                className="changePassword-error"
              />
            </div>
            <div className="changePassword-group">
              <span className="label-changePassword"> Nova Password </span>
              <Field
                type="password"
                name="newPassword"
                className="campo-changePassword"
              />
              <ErrorMessage
                component="span"
                name="password"
                className="changePassword-error"
              />
            </div>
            <div className="changePassword-group">
              <span className="label-changePassword">
                {" "}
                Confirmar Nova Password{" "}
              </span>
              <Field
                type="password"
                name="confirmarPassword"
                className="campo-changePassword"
              />
              <ErrorMessage
                component="span"
                name="confirmarPassword"
                className="changePassword-error"
              />
            </div>
            <button className="btn-changePassword" type="submit">
              {" "}
              Alterar Password{" "}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ChangePasswordMenu;
