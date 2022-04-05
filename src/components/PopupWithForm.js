export default function PopupWithForm({title, name, isOpen, buttonText, children}) {
  return(
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened': ''}` }>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={`form-${name}`} noValidate>
             {children}           
            <button type="submit" className="popup__form-save">{buttonText}</button>
          </form>
          <button className="popup__close" type="button" />
        </div>
      </section>

      /*<section className="popup popup_type_confirmation">
      <div className="popup__container-confirmation">
        <h2 className="popup__title">Вы уверены?</h2>
        <form className="popup__form" name="confirmation-form" noValidate="">
          <button
            type="submit"
            className="popup__form-save popup__save-confirmation"
          >
            Да
          </button>
        </form>
        <button className="popup__close" type="button" />
      </div>
      </section>*/
  )
}