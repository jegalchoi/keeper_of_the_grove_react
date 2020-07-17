import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { GroveContext } from '../../context'
import { registrationsReducer } from './useRegistrations'
import { ContainerWrapper } from '../ContainerWrapper'
import { config } from '../../Constants'

export const Login = () => {
  const [{}, dispatch] = useContext(GroveContext)

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
    // console.log('logging in')

    loginDispatch({ type: 'AUTH_START_LOADING' })

    const user = {
      username,
      password,
    }
    const urlLogin = config.url.API_URL_LOGIN
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
    // .catch((error) =>
    //   // console.log('Login/handleSubmit api errors:', error)
    // )

    e.preventDefault()
  }

  const history = useHistory()

  const handleErrors = () => {
    // console.log('rendering errors')
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

  // console.log('login')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>login</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row justify-content-center form-group form-control-lg'>
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
              required={!loading}
            />
          </div>
          <div className='row justify-content-center form-group form-control-lg'>
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
              required={!loading}
            />
          </div>
          {loading ? (
            <div className='row justify-content-center'>
              <button
                disabled
                className='btn-success btn-lg mt-3 text-capitalize'
                style={{ width: '200px' }}
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
                  style={{ width: '200px' }}
                >
                  <strong>log in</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/signup'>
                  <button
                    placeholder='create account'
                    className='btn-secondary btn-lg mt-3 text-capitalize'
                    style={{ width: '200px' }}
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
                    style={{ width: '200px' }}
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
