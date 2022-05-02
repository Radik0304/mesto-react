import React from 'react';
import { Route, Switch} from 'react-router-dom';
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
import AuthForm from './AuthForm.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [isPopupAvatarOpen, setPopupAvatarOpened] = React.useState(false); 
  const [isPopupProfileOpen, setPopupProfileOpened] = React.useState(false);
  const [isPopupPlaceOpen, setPopupPlaceOpened] = React.useState(false);
  const [isPopupInfoOpen, setPopupInfoOpen] = React.useState(false);
  const [selectedCard, setCardOpen] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false)

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
    .catch(console.log)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => 
        setCards((state) => state.filter((c) => c._id !== card._id && c))
      )
      .catch(console.log)
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
    .catch(console.log)
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
    .catch(console.log)
  }

  function handleAddNewCard(card) {
    api.addNewCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch(console.log)
  }

  function handleRegister() {
    
  }
  // //переадресация
  // function RedirectUser() {
  //   setLoggedIn(true);
  // };



  return (
      <div className = 'page'>
        <div className="page-container">
          <CurrentUserContext.Provider value={currentUser}>
          <Header/> 

        <Switch>
          <ProtectedRoute 
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
          >
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
          </ProtectedRoute>

          <Route 
            path='/sign-up'
          >  
            <Register handleRegister={handleRegister} />
          </Route>
          
          <Route path='/sign-in'>
            <Login />  
          </Route>
            
        </Switch>
          
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

           <InfoTooltip 
            isOpen={isPopupInfoOpen}
            onClose={closeAllPopups}
           />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          
          </CurrentUserContext.Provider>
        </div>
      </div>

  );
}

export default App;
