import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar:avatarRef.current.value})
  }

  React.useEffect(()=> {
    avatarRef.current.value='';
  }, [isOpen])

  return(
    <PopupWithForm 
    title='Обновить аватар' 
    name='avatar' 
    buttonText='Сохранить' 
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <input 
        id="add-url-avatar" 
        type="url" 
        autoComplete="off" 
        className="popup__input popup__input_type_avatar" 
        name="avatar" 
        placeholder="Ссылка на картинку" 
        required 
        ref={avatarRef}
        />
      <span 
        id='add-url-avatar-error' 
        className="popup__error"
      > 
      </span>
  </PopupWithForm>
  )
}