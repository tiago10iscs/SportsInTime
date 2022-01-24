import React from "react";
import "./styles.css";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

/**
 * Este compoenete é utilizado para o utilizador efetuar login na aplicação. É apresentado através de um popup
 * ativado por um trigger que é passado como parâmetro "props.trigger".
 * Após o utilizador inserir os seus dados e permir o botão, os dados são enviados para o back end e verificados.
 * Caso os dados sejam válidos os utilizador recebe um token e è redirecionado para a ágina inicial.
 *
 * @param {*} props recebe qualquer tipo de variável, neste caso recebe um trigger que permite ativar o popup
 * @returns div que contém o formulário para o utilizador efetuar o login no website
 */
function LoginPopup(props) {
  /**
   * Função que envia informações do utilizador para o back end, de modo a efetuar o login do mesmo na aplicação.
   * Após efetuar o login, é atribuido um token ao utilizador, que permite que o mesmo aceda a determinadas rotas do backend.
   *
   * @param {*} values objeto que contém informações do utilizador
   */
  const handleSubmit = (values) => {
    axios
      .post("https://localhost:7261/api/Auth/login", values)
      .then((resp) => {
        const { data } = resp;
        console.log(data);
        if (data) {
          localStorage.setItem("app-token", data);
          localStorage.setItem("isLogged", true);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "User not found") {
          window.alert("Utilizador não encontrado");
        } else if (error.response.data === "User is banned") {
          window.alert("Utilizador banido");
        } else if (error.response.data === "Wrong password") {
          window.alert("Password errada");
        }
      });
  };

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  return props.trigger ? (
    <div className="popup">
      <div className="loginContainer">
        <div className="loginTopBar">
          <span className="loginTitle"> LOGIN </span>
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
          <Form className="Login">
            <span className="fieldTitle"> Email </span>
            <div className="Login-Group">
              <Field name="email" className="Login-Field" />
              <ErrorMessage
                component="span"
                name="email"
                className="Login-Error-Email"
              />
            </div>
            <span className="fieldTitle"> Password </span>
            <div className="Login-Group">
              <Field type="password" name="password" className="Login-Field" />
              <ErrorMessage
                component="span"
                name="password"
                className="Login-Error-Password"
              />
            </div>
            <button className="Login-Btn" type="submit">
              LOGIN
            </button>
            <span className="redirectText" onClick={() => props.setRegisto()}>
              Ainda não tens conta? Regista-te
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  ) : (
    ""
  );
}

export default LoginPopup;
