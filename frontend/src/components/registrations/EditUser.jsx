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

  componentDidMount() {
    let user = {
      username: this.props.username,
      email: this.props.email,
      id: this.props.id,
    };
    // console.log('mounted edituser')
    this.getUser(user)
    // console.log(user)
  }

  getUser = ({ username, email, id }) => {
    this.setState({
      username,
      email,
      id,
    })
    // setTimeout(() => console.log(this.state), 5000)
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    // console.log('form submitted')
    const { username, email, password, password_confirmation } = this.state

    let user = {
      username,
      email,
      password,
      password_confirmation,
    }

    axios
      .patch(`http://localhost:3001/users/${this.props.id}`, { user }, { withCredentials: true })
      .then(response => {
        console.log(response)
        if (response.data.status === 'updated') {
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors,
          })
        }
      })
      .catch(error => console.log('edit user api errors:', error))
  }

  deleteUser = () => {
    const url = `http://localhost:3001/users/${this.props.id}`

    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      console.log('user deletion submitted')
      axios
        .delete(url, { withCredentials: true })
        .then(response => {
          // console.log(response)
          if (response.data.status === 'destroyed') {
            this.props.handleLogout()
            this.redirect()
          } else {
            this.setState({
              errors: response.data.errors,
            })
          }
        })
        .catch(error => console.log('delete user api errors:', error))
    }          
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
    const { username, email, password, password_confirmation } = this.state;

    return (
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize'><strong>edit account</strong></h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder='Username'
              type='text'
              name='username'
              value={username}
              onChange={this.handleChange}
              required
            />
            <br /><br />
            <input
              placeholder='Email'
              type='email'
              name='email'
              value={email}
              onChange={this.handleChange}
              required
            />
            <br /><br />
            <input
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              onChange={this.handleChange}
              required
            />
            <br /><br />
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
              className='btn-success btn-lg mt-3 text-capitalize'
            >
              <strong>update account</strong>
          </button>
            <br />
            <button
              placeholder='delete'
              onClick={this.deleteUser}
              className='btn-danger btn-lg mt-3 text-uppercase'
            >
              <strong>delete account</strong>
          </button>
          <br />
            <Link to='/'>
              <button
                placeholder='home'
                className='btn-primary btn-lg mt-3 text-capitalize'
              >
                <strong>home</strong>
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
