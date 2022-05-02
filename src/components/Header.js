import logo from '../blocks/header/__logo/logo.svg';

export default function Header({}) {
  return(
    <header className="header">
    <img
      className="header__logo"
      src={logo}
      alt="логотип сайта"
    />
  </header>
  )
}