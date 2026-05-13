import './index.css'
import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/nxt-assess-logo.png'

const Header = () => {
  const navigate = useNavigate()

  const onLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <header className="header">
      <Link to="/">
        <img
          src={logo}
          alt="website logo"
          className="header-logo"
        />
      </Link>

      <button
        type="button"
        className="logout-button"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  )
}

export default Header