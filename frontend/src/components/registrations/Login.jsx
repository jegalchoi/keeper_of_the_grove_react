import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

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
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    const { username, password } = this.state;
    let user = {
      username,
      password,
    };

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
      .catch(error => console.log('login api errors:', error))

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
    const { username, password } = this.state;

    return (
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize'><strong>log in</strong></h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder='Enter username'
              type='text'
              name='username'
              value={username}
              onChange={this.handleChange}
            />
            <br /><br />
            <input
              placeholder='Enter password'
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
            />
            <br />
            <button
              placeholder='submit'
              type='submit'
              className='btn-success btn-lg mt-3 text-capitalize'
            >
              <strong>log in</strong>
            </button>
            <br />
            <Link to='/signup'>
              <button
                placeholder='create account'
                className='btn-primary btn-lg mt-3 text-capitalize'
              >
                <strong>create account</strong>
              </button>
            </Link>
          </form>
          <div>
            {this.state.errors ? this.handleErrors() : null}
          </div>
        </div>
      </div>
    )
  }
}
