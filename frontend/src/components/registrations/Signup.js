import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: '',
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('form submitted')
    const { username, email, password, password_confirmation } = this.state

    let user = {
      username,
      email,
      password,
      password_confirmation,
    }

    axios
      .post('http://localhost:3001/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors,
          })
        }
      })
      .catch(error => console.log('api errors:', error))
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
    const { username, email, password, password_confirmation } = this.state

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder='Username'
            type='text'
            name='username'
            value={username}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Email'
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Password'
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            required
          />
          <input
            placeholder='Confirm Password'
            type='password'
            name='password_confirmation'
            value={password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br />
          <button
            placeholder='submit'
            type='submit'
            className='btn-primary btn-lg rounded'
          >
            Create Account
          </button>

          <div>
            <Link to='/login'>Log In</Link>
          </div>
        </form>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </div>
    )
  }
}
