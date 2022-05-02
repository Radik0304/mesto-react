import React from "react";

export default function InfoTooltip({isOpen, onClose}) {
  return(
    <section className={`popup popup_type_info ${isOpen ? 'popup_opened' : ''}`}>
        <div className='popup__image-container'>
          <div className='popup__tooltip-image popup__tooltip-image_type_error' />
          <figcaption className='popup__tooltip-text'>text</figcaption>
          <button className='popup__close' type='button' onClick={onClose}/>
        </div>
      </section>
  )
}
