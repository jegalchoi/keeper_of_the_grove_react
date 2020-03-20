import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: '',
    }
  }

  componentWillMount() {
    return this.props.loggedInStatus === 'LOGGED_IN' ? this.redirect() : null
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    const { username, password } = this.state

    let user = {
      username,
      password,
    }

    axios
      .post('http://localhost:3001/login', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors,
          })
        }
      })
      .catch(error => console.log('api errors:', error))

    e.preventDefault()
  }

  redirect = () => this.props.history.push('/')

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const { username, password } = this.state

    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='username'
            type='text'
            name='username'
            value={username}
            onChange={this.handleChange}
          />
          <input
            placeholder='password'
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />

          <button placeholder='submit' type='submit'>
            Log In
          </button>

          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    )
  }
}
