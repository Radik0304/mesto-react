import React from "react";
import pencel from '../blocks/profile/__button-edit/pencel.svg';
import profileButtonAdd from '../blocks/profile/__button-add/Vector.svg';
import { api } from "../utils/Api";
import Card from "./Card";
import {CurrentUserContext}  from "../contexts/CurrentUserContext.js";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

  // const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);


  // React.useEffect(()=> {
  //   Promise.all([api.getInitialCards()])
  //   .then(([cards]) => { 
  //     setCards(cards)
  //   })
  //   .catch(console.log);
  // },[])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar avatar" style={{backgroundImage: `url(${currentUser.avatar})`}}  onClick={onEditAvatar} />
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button className="profile__change" type="button" onClick={onEditProfile}>
              <img
                className="profile__button-edit"
                src={pencel}
                alt="карандаш"
              />
            </button>
          </div>
        </div>
          <button className="profile__add" type="button" onClick={onAddPlace}>
            <img
              className="profile__button-add"
              src={profileButtonAdd}
              alt="логотип кнопки добавления файла"
            />
          </button>
      </section>
      <section className="elements">
      {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          )
        })}
      </section>
    </main>
  )
}