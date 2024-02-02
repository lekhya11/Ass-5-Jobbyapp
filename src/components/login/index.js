import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isFailed: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessView = jwtToken => {
    Cookies.set('kookie', jwtToken, {expires: 30})
    // console.log('hello')
    const {history} = this.props

    history.push('/')
  }

  onFailureView = errorMsg => {
    this.setState({
      isFailed: true,
      errorMsg,
    })
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSuccessView(data.jwt_token)
    } else {
      this.onFailureView(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('kookie')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {isFailed, username, password, errorMsg} = this.state
    return (
      <div className="background-login">
        <form className="card-cont" onSubmit={this.onClickSubmit}>
          <div className="image-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="image"
            />
          </div>

          <label htmlFor="userName" className="label-text">
            Username
          </label>
          <input
            type="text"
            id="userName"
            className="inputEl"
            value={username}
            onChange={this.onChangeUsername}
          />

          <label htmlFor="Password" className="label-text">
            Password
          </label>
          <input
            id="Password"
            type="password"
            className="inputEl"
            value={password}
            onChange={this.onChangePassword}
          />

          <button type="submit" className="button">
            Login
          </button>
          {isFailed && <p className="failure-text">*{errorMsg} </p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
