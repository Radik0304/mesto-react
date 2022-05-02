import React from "react";
import AuthForm from "./AuthForm";
import { register } from "../utils/Auth";

export default function Register(props) {

function handleSubmit(e) {
  e.preventDefault();
  register()
}

  return(
    <AuthForm title='Регистрация' buttonText='Зарегистрироваться' onSubmit={handleSubmit}>
      <figcaption className="popup__form-save_auth-caption">Уже зарегистрированы? <button className="popup__form-save_auth-link">Войти</button></figcaption>
    </AuthForm>
      
  )
}
