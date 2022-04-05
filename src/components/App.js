import React from 'react';
import Footer from './Footer.js';
import './Header.js'
import Header from './Header.js';
import Main from './Main.js'
import PopupWithForm from './PopupWithForm.js';

function App() {
  const [isPopupOpen, setPopupOpened] = React.useState({isEditProfilePopupOpen: false, isAddPlacePopupOpen:false, isEditAvatarPopupOpen:false}); 

  //функции открытия попапов
  function handleEditProfileClick() {
    setPopupOpened({...isPopupOpen, isEditProfilePopupOpen: true});
  }

  function handleAddPlaceClick() {
    setPopupOpened({...isPopupOpen, isAddPlacePopupOpen: true});
  }

  function handleEditAvatarClick() {
    setPopupOpened({...isPopupOpen, isEditAvatarPopupOpen: true});
  }
  
  return (
  <>
    <div className = 'page'>
      <div className="page-container">
        <Header/>
        <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} />
        <Footer/>

        {/* popup-profile */}
        <PopupWithForm title='Редактировать профиль' name='profile' buttonText='Сохранить' isOpen={isPopupOpen.isEditProfilePopupOpen}>
          <input type="text" id="edit-name" autocomplete="off" class="popup__input popup__input_type_name" placeholder="Имя" value="Жак-Ив Кусто" name="kusto" minlength="2" maxlength="40" required />
          <span id="edit-name-error" class="popup__error"></span>

          <input type="text" id="edit-job" autocomplete="off" class="popup__input popup__input_type_description" placeholder="Профессинальная деятельность" value="Исследователь океана" name="discover" minlength="2" maxlength="200" required />
          <span class="popup__error" id="edit-job-error"></span>
        </PopupWithForm>

        {/* popup-new card */}
        <PopupWithForm title='Новое место' name='cards' buttonText='Сохранить' isOpen={isPopupOpen.isAddPlacePopupOpen}>
        <input id='add-title' type="text" autocomplete="off" class="popup__input popup__input_type_name"  name="nameplace" placeholder="Название" minlength="2" maxlength="30" required />
        <span id='add-title-error' class="popup__error"></span>

        <input id='add-url' type="url" autocomplete="off" class="popup__input popup__input_type_description"  name="photolink" placeholder="Ссылка на картинку" required />
        <span id='add-url-error' class="popup__error"></span>
        </PopupWithForm>

        {/* popup-avatar */}
        <PopupWithForm title='Обновить аватар' name='avvatar' buttonText='Сохранить' isOpen={isPopupOpen.isEditAvatarPopupOpen}>
        <input id="add-url-avatar" type="url" autocomplete="off" class="popup__input popup__input_type_avatar" name="avatar" placeholder="Ссылка на картинку" required />
        <span id='add-url-avatar-error' class="popup__error"></span>
        </PopupWithForm>
        <template className="card-template" />
      </div>
    </div>
  </>

  );
}

export default App;
