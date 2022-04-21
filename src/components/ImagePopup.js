import React from "react";

export default function ImagePopup({card, onClose}) {
  return(
    <section className={`popup popup_type_image ${card.link && 'popup_opened'}`}>
        <div className='popup__image-container'>
          <img className='popup__image-photo' src={`${card.link}`} alt={card.name} />
          <figcaption className='popup__image-text'>{card.name}</figcaption>
          <button className='popup__close' type='button' onClick={onClose}/>
        </div>
      </section>
  )
}
