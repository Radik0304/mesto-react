import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setNamePlace] = React.useState('');
  const [link, setLinkPlace] = React.useState('');

  function handleAddPlaceSubmit(e){
    e.preventDefault();
    onAddPlace({name, link})
  }

  function handleChangeTitle(e){
    setNamePlace(e.target.value)
  }

  function handleChangeLink(e) {
    setLinkPlace(e.target.value)
  }

  React.useEffect(() => {
    setNamePlace('');
    setLinkPlace('');
  }, [isOpen]); 

  return(
    <PopupWithForm 
      title='Новое место' 
      name='cards' 
      buttonText='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      >
        <input 
          id='add-title' 
          type="text" 
          autoComplete="off" 
          className="popup__input popup__input_type_name"  
          name="nameplace" 
          placeholder="Название" 
          minLength="2" 
          maxLength="30" 
          required 
          onChange={handleChangeTitle}
          value={name || ''}
          />
        <span id='add-title-error' className="popup__error"></span>

        <input 
          id='add-url' 
          type="url" 
          autoComplete="off" 
          className="popup__input popup__input_type_description"  
          name="photolink" 
          placeholder="Ссылка на картинку" 
          required 
          onChange={handleChangeLink}
          value={link || ''}
          />
        <span id='add-url-error' className="popup__error"></span>
        </PopupWithForm>
  )
}