import React from "react";
import ReactDOM from 'react-dom';
import pencel from '../blocks/profile/__button-edit/pencel.svg';
import profileButtonAdd from '../blocks/profile/__button-add/Vector.svg';

export default function Main({onEditProfile, onAddPlace, onEditAvatar}) {

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar avatar" onClick={onEditAvatar} />
          <div className="profile__info-container">
            <div className="profile__info">
              <h1 className="profile__name">Жак Ив Кусто</h1>
              <p className="profile__job">Исследователь Океана</p>
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
      <section className="elements"></section>

      {/*тут был код попапа профиля*/}
      
      {/*тут был кода попапа добавления карточек*/}
      

      {/*тут попап картинок*/}

      
      {/*тут попап аватара был*/}
    </main>
  )
}