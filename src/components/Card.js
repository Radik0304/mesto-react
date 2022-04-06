export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  return(
    <div className="elements__card">
      <img className="elements__photo" src={`${props.card.link}`} alt={props.card.name} onClick={handleClick}/>

      <div className="elements__card-bottom">
        <p className="elements__name">{props.card.name}</p>
        <div className="elements__likes">
          <button className="elements__button-like" type="button"></button>
          <span className="elements__like-number">{props.card.likes.length}</span>
        </div>
        <button className="elements__button-delete" type="button"></button>
      </div>
    </div>
  )
}