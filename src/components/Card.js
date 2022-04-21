import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `elements__button-delete ${isOwn ? 'elements__button-delete' : 'elements__button-delete_type_hidden'}`
  );

  const isLiked = props.card.likes.some(userWhoLiked=>userWhoLiked._id === currentUser._id);
  const cardButtonLikeClassName = `elements__button-like ${isLiked ? 'elements__button-like_type_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return(
    <div className="elements__card">
      <img className="elements__photo" src={`${props.card.link}`} alt={props.card.name} onClick={handleClick}/>

      <div className="elements__card-bottom">
        <p className="elements__name">{props.card.name}</p>
        <div className="elements__likes">
          <button className={cardButtonLikeClassName} type="button" onClick={handleLikeClick}></button>
          <span className="elements__like-number">{props.card.likes.length}</span>
        </div>
        <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      </div>
    </div>
  )
}