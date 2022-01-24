import React from "react";
import * as yup from "yup";
import axios from "axios";
import "./styles.css";
import { ErrorMessage, Formik, Form, Field } from "formik";

function Register(props) {
  /**
   * Função que envia informações do utilizador para o back end, de modo a efetuar o registo do mesmo
   *
   * @param {*} values objeto que contém informações do utilizador
   */
  const handleSubmit = (values) => {
    console.log(values);
    axios
      .post("https://localhost:7261/api/Auth/register", values)
      .then((resp) => {
        const { data } = resp;
        if (data) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data === "Email already existing") {
          window.alert("O email inserido já se encontra registado");
        } else if (error.response.data === "Username already existing") {
          window.alert("O username inserido já se encontra registado");
        }
      });
  };

  /* VALIDAÇOES DOS CAMPOS A PREENCHER*/
  const validations = yup.object().shape({
    name: yup.string().max(10).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmarPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "passwords do not match")
      .required(),
  });
  return props.trigger ? (
    <div className="popup">
      <div className="registoContainer">
        <div className="topBar">
          <span className="registoTitle"> REGISTO </span>
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
          <Form className="registo">
            <div className="registo-group">
              <span className="label-registo"> Username </span>
              <Field name="name" className="campo-registo" />
              <ErrorMessage
                component="span"
                name="name"
                className="registo-error"
              />
            </div>
            <div className="registo-group">
              <span className="label-registo"> Email </span>
              <Field name="email" className="campo-registo" />
              <ErrorMessage
                component="span"
                name="email"
                className="registo-error"
              />
            </div>
            <div className="registo-group">
              <span className="label-registo"> Password </span>
              <Field
                type="password"
                name="password"
                className="campo-registo"
              />
              <ErrorMessage
                component="span"
                name="password"
                className="registo-error"
              />
            </div>
            <div className="registo-group">
              <span className="label-registo"> Confirmar Password </span>
              <Field
                type="password"
                name="confirmarPassword"
                className="campo-registo"
              />
              <ErrorMessage
                component="span"
                name="confirmarPassword"
                className="registo-error"
              />
            </div>
            <button
              className="btn-registo"
              type="submit"
              onClick={() => handleSubmit()}
            >
              {" "}
              REGISTAR{" "}
            </button>
            <span className="redirectText" onClick={() => props.setLogin()}>
              {" "}
              Ja tens conta? Faz o teu login!
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Register;
