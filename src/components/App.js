import React from 'react';
import Footer from './Footer.js';
import './Header.js'
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js'
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import { api } from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

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
    api.changeLike(card._id, !isLiked) 
    .then((newCard) => 
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    )
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((state) => state._id !== card._id));
      })
  }

  function handleUpdateUser(user) {
    api.editProfile(user.name, user.about)
    .then((editUserInfo)=> {
      setCurrentUser({
        ...currentUser,
        name: editUserInfo.name,
        about: editUserInfo.about
      });
      closeAllPopups()
    })
  }

  function handleUpdateAvatar(data) {
    console.log(data.avatar)
    api.changeAvatar(data.avatar)
    .then((res) => {
      setCurrentUser({
        ...currentUser,
        avatar: res.avatar
      });
      closeAllPopups();
    })
  }

  function handleAddNewCard(card) {
    api.addNewCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
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
        <EditProfilePopup 
          isOpen={isPopupProfileOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        /> 

        {/* popup-new card */}
        <AddPlacePopup 
          isOpen={isPopupPlaceOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddNewCard}
        />

        {/* popup-avatar */}
        <EditAvatarPopup 
          isOpen={isPopupAvatarOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* popup-remove */}
        <PopupWithForm title='Вы уверены?' name='remove' buttonText='Да' />
        
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
