import React from "react";

export default function ImagePopup() {
  return(
    <section className="popup popup_type_image">
        <div className="popup__image-container">
          <img className="popup__image-photo" src="#" alt="#" />
          <figcaption className="popup__image-text" />
          <button className="popup__close" type="button" />
        </div>
      </section>
  )
}
