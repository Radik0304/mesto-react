import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('Name');
  const [description, setDescription] = React.useState('About');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handlechangeAbout(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    })
  }

  return(
    <PopupWithForm 
      title='Редактировать профиль' 
      name='profile' 
      buttonText='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        id="edit-name" 
        autoComplete="off" 
        className="popup__input popup__input_type_name"  
        placeholder="name"  
        name="kusto" 
        minLength="2" 
        maxLength="40" 
        value={name||''}
        onChange={handleChangeName}
        required
      />
      <span id="edit-name-error" className="popup__error"></span>

      <input 
        type="text" 
        id="edit-job" 
        autoComplete="off" 
        className="popup__input popup__input_type_description" 
        placeholder="job"  
        name="discover" 
        minLength="2" 
        maxLength="200" 
        value={description||''} 
        onChange={handlechangeAbout}
        required 
      />
      <span className="popup__error" id="edit-job-error"></span>
    </PopupWithForm>
  )
}