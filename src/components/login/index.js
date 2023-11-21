import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isSuccues: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickSuccess = () => {
    console.log('hello')
    const {history} = this.props

    history.push('/')
  }

  onFailureView = errorMsg => {
    this.setState({
      isSuccues: true,
      errorMsg,
    })
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onClickSuccess()
    } else {
      this.onFailureView(data.error_msg)
    }
  }

  render() {
    const {isSuccues, username, password, errorMsg} = this.state
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
          {isSuccues && <p className="failure-text">*{errorMsg} </p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
