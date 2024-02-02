import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('kookie')
    history.replace('/login')
  }

  return (
    <div className="header-bg">
      <img
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        className="header-image"
      />
      <ul className="links-header">
        <Link to="/">
          <p className="para">Home</p>
        </Link>
        <Link to="/Jobs">
          <p className="para">Jobs</p>
        </Link>
      </ul>
      <button type="button" onClick={onClickLogOut} className="header-button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
