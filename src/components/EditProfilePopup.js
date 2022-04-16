import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen,onClose}) {
  const currentUser = React.useContext(CurrentUserContext)
  return(
    <PopupWithForm title='Редактировать профиль' name='profile' buttonText='Сохранить' isOpen={isPopupProfileOpen} onClose={closeAllPopups}>
      <input type="text" id="edit-name" autoComplete="off" className="popup__input popup__input_type_name"  placeholder="name"  name="kusto" minLength="2" maxLength="40" required />
      <span id="edit-name-error" className="popup__error"></span>

      <input type="text" id="edit-job" autoComplete="off" className="popup__input popup__input_type_description" placeholder="job"  name="discover" minLength="2" maxLength="200" required />
      <span className="popup__error" id="edit-job-error"></span>
    </PopupWithForm>
  )
}