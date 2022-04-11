import React from "react";
import pencel from '../blocks/profile/__button-edit/pencel.svg';
import profileButtonAdd from '../blocks/profile/__button-add/Vector.svg';
import { api } from "../utils/Api";
import Card from "./Card";

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userInfo, setUserInfo] = React.useState({userName:'', userDescription:'', userAvatar:''});
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([res, cards]) => { 
      setUserInfo({userName: res.name, userDescription: res.about, userAvatar: res.avatar});
      setCards(cards)
      
    })
    .catch(console.log);
  },[])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar avatar" style={{backgroundImage: `url(${userInfo.userAvatar})`}}  onClick={onEditAvatar} />
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__name">{userInfo.userName}</h1>
              <p className="profile__job">{userInfo.userDescription}</p>
            </div>
            <button className="profile__change" type="button"  onClick={onEditProfile}>
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
            <Card key={card._id} card={card} onCardClick={onCardClick}/>
          )
        })}
      </section>
    </main>
  )
}