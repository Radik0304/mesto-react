import React from "react";

export default function AuthForm({title, buttonText, onSubmit, children}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  return(
    <>
          <h2 className="popup__title popup__title_auth">{title}</h2>
          <form className="popup__form popup__form_auth" onSubmit={onSubmit}>  
          <input 
            type="text" 
            id="edit-name" 
            autoComplete="off" 
            className="popup__input popup__input_type_auth"  
            placeholder="Email"  
            name="email" 
            minLength="2" 
            maxLength="40" 
            value={email||''}
            onChange={handleEmail}
            required
          />     

          <input 
            type="password" 
            id="edit-job" 
            autoComplete="off" 
            className="popup__input popup__input_type_auth" 
            placeholder="Пароль"  
            name="password" 
            minLength="2" 
            maxLength="200" 
            value={password||''}
            onChange={handlePassword}
            required 
         />
            <button type="submit" className="popup__form-save popup__form-save_auth">{buttonText}</button>
            {children}
          </form>
  </>  
  )
}