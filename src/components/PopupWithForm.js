export default function PopupWithForm({title, name, isOpen, buttonText='Сохранить', children, onClose, onSubmit}) {
  return(
    <section className={`popup ${isOpen && 'popup_opened'}` }>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={`form-${name}`} noValidate onSubmit={onSubmit}>
             {children}           
            <button type="submit" className="popup__form-save">{buttonText}</button>
          </form>
          <button className="popup__close" type="button" onClick={onClose}/>
        </div>
      </section>
  )
}