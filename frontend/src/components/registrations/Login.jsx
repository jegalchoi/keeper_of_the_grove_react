import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { registrationsReducer } from './useRegistrations'
import { ContainerWrapper } from '../ContainerWrapper'

export const Login = () => {
  const [{}, dispatch] = useContext(PlantContext)

  const [
    { username, password, loading, errors },
    loginDispatch,
  ] = useReducer(registrationsReducer, {
    username: '',
    password: '',
    loading: false,
    errors: null,
  })

  const handleSubmit = (e) => {
    console.log('logging in')

    loginDispatch({ type: 'AUTH_START_LOADING' })

    const user = {
      username,
      password,
    }
    // const urlLogin = 'http://localhost:3001/login'
    const urlLogin = '/login'
    axios
      .post(urlLogin, { user }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.logged_in) {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          loginDispatch({
            type: 'AUTH_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('Login/handleSubmit api errors:', error)
      )

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

  console.log('login')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>login</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row justify-content-center form-group'>
            <input
              type='text'
              placeholder='Username'
              disabled={loading}
              value={username}
              onChange={(e) =>
                loginDispatch({
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
              type='password'
              placeholder='Password'
              disabled={loading}
              value={password}
              onChange={(e) =>
                loginDispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          {loading ? (
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
                  <strong>log in</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/signup'>
                  <button
                    placeholder='create account'
                    className='btn-secondary btn-lg mt-3 text-capitalize'
                  >
                    <strong>sign up</strong>
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
