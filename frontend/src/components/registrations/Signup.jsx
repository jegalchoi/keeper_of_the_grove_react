import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { registrationsReducer } from './useRegistrations'
import { ContainerWrapper } from '../ContainerWrapper'

export const Signup = () => {
  const [{ formIsLoading }, dispatch] = useContext(PlantContext)

  const [
    { username, email, password, passwordConfirmation, errors },
    signupDispatch,
  ] = useReducer(registrationsReducer, {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    loading: false,
    errors: null,
  })

  const handleSubmit = (e) => {
    console.log('signing up')

    signupDispatch({ type: 'AUTH_START_LOADING' })

    let user = {
      username,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }
    // const urlSignup = 'http://localhost:3001/users'
    const urlSignup = '/users'
    axios
      .post(urlSignup, { user }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'created') {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          signupDispatch({
            type: 'AUTH_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) => console.log('Signup api errors:', error))

    e.target.reset()
    e.preventDefault()
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.map((error) => {
            return (
              <li key={error}>
                <strong>{error}</strong>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  console.log('signup')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>sign up</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row justify-content-center form-group'>
            <input
              type='text'
              placeholder='Username'
              disabled={formIsLoading}
              value={username}
              onChange={(e) =>
                signupDispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          <div className='row justify-content-center form-group'>
            <input
              type='email'
              placeholder='Email'
              disabled={formIsLoading}
              value={email}
              onChange={(e) =>
                signupDispatch({
                  type: 'field',
                  fieldName: 'email',
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          <div className='row justify-content-center form-group'>
            <input
              type='password'
              placeholder='Password'
              disabled={formIsLoading}
              value={password}
              onChange={(e) =>
                signupDispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          <div className='row justify-content-center form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              disabled={formIsLoading}
              value={passwordConfirmation}
              onChange={(e) =>
                signupDispatch({
                  type: 'field',
                  fieldName: 'passwordConfirmation',
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          {formIsLoading ? (
            <div className='row justify-content-center'>
              <button
                disabled
                className='btn-success btn-lg mt-3 text-capitalize'
              >
                processing
              </button>
            </div>
          ) : (
            <React.Fragment>
              <div className='row justify-content-center'>
                <button
                  type='submit'
                  placeholder='submit'
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>create account</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/login'>
                  <button
                    placeholder='login'
                    className='btn-secondary btn-lg mt-3 text-capitalize'
                  >
                    <strong>login</strong>
                  </button>
                </Link>
              </div>
              <div className='row justify-content-center'>
                <Link to='/'>
                  <button
                    placeholder='home'
                    className='btn-primary btn-lg mt-3 text-capitalize'
                  >
                    <strong>home</strong>
                  </button>
                </Link>
              </div>
            </React.Fragment>
          )}
        </div>
      </form>
      <br />
      <div>{errors && handleErrors()}</div>
    </ContainerWrapper>
  )
}
