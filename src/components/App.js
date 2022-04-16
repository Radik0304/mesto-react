import React from 'react';
import Footer from './Footer.js';
import './Header.js'
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js'
import PopupWithForm from './PopupWithForm.js';
import { api } from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function App() {
  const [isPopupAvatarOpen, setPopupAvatarOpened] = React.useState(false); 
  const [isPopupProfileOpen, setPopupProfileOpened] = React.useState(false);
  const [isPopupPlaceOpen, setPopupPlaceOpened] = React.useState(false);
  const [selectedCard, setCardOpen] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards])=> {
      setCurrentUser(userData);
      setCards(cards)
    })
    .catch(console.log);
  }, []);

  //функции открытия попапов
  function handleEditProfileClick() {
    setPopupProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setPopupPlaceOpened(true);
  }

  function handleEditAvatarClick() {
    setPopupAvatarOpened(true);
  }
  
  function handleCardClick(card) {
    setCardOpen(card)
  }

  function closeAllPopups() {
    setPopupAvatarOpened(false);
    setPopupProfileOpened(false);
    setPopupPlaceOpened(false);
    setCardOpen({})
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.putLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(() => {
        setCards(cards.filter((state) => state._id !== card._id));
      })
  }

  return (
    <div className = 'page'>
      <div className="page-container">
        <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main 
          onEditProfile={handleEditProfileClick} 
          onEditAvatar={handleEditAvatarClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer/>

        {/* popup-profile */}
        <PopupWithForm title='Редактировать профиль' name='profile' buttonText='Сохранить' isOpen={isPopupProfileOpen} onClose={closeAllPopups}>
          <input type="text" id="edit-name" autoComplete="off" className="popup__input popup__input_type_name"  placeholder="name"  name="kusto" minLength="2" maxLength="40" required />
          <span id="edit-name-error" className="popup__error"></span>

          <input type="text" id="edit-job" autoComplete="off" className="popup__input popup__input_type_description" placeholder="job"  name="discover" minLength="2" maxLength="200" required />
          <span className="popup__error" id="edit-job-error"></span>
        </PopupWithForm>

        {/* popup-new card */}
        <PopupWithForm title='Новое место' name='cards' buttonText='Сохранить' isOpen={isPopupPlaceOpen} onClose={closeAllPopups}>
        <input id='add-title' type="text" autoComplete="off" className="popup__input popup__input_type_name"  name="nameplace" placeholder="Название" minLength="2" maxLength="30" required />
        <span id='add-title-error' className="popup__error"></span>

        <input id='add-url' type="url" autoComplete="off" className="popup__input popup__input_type_description"  name="photolink" placeholder="Ссылка на картинку" required />
        <span id='add-url-error' className="popup__error"></span>
        </PopupWithForm>

        {/* popup-avatar */}
        <PopupWithForm title='Обновить аватар' name='avvatar' buttonText='Сохранить' isOpen={isPopupAvatarOpen} onClose={closeAllPopups}>
        <input id="add-url-avatar" type="url" autoComplete="off" className="popup__input popup__input_type_avatar" name="avatar" placeholder="Ссылка на картинку" required />
        <span id='add-url-avatar-error' className="popup__error"></span>
        </PopupWithForm>

        {/* popup-remove */}
        <PopupWithForm title='Вы уверены?' name='remove' buttonText='Да' />
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;