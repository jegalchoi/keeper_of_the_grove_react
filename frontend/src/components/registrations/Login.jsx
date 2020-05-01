import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { registrationsReducer } from './useRegistrations'
import { ContainerWrapper } from '../ContainerWrapper'

export const Login = () => {
  const [{ formIsLoading }, dispatch] = useContext(PlantContext)

  const [{ username, password, errors }, loginDispatch] = useReducer(
    registrationsReducer,
    {
      username: '',
      password: '',
      errors: null,
    }
  )

  const handleSubmit = (e) => {
    console.log('logging in')

    dispatch({ type: 'FORM_START_LOADING' })

    const user = {
      username,
      password,
    }
    const url = 'http://localhost:3001/login'

    axios
      .post(url, { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({ type: 'FORM_DONE_LOADING' })
          loginDispatch({
            type: 'AUTH_LOGIN_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) => console.log('login api errors:', error))

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

  console.log('login')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>login</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div className='form-group text-center'>
                <input
                  type='text'
                  placeholder='Username'
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
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='form-group text-center'>
                <input
                  type='password'
                  placeholder='Password'
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
            </div>
          </div>
          {formIsLoading ? (
            <div className='row'>
              <div className='col text-center'>
                <button
                  disabled
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  processing
                </button>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className='row'>
                <div className='col text-center'>
                  <button
                    type='submit'
                    placeholder='submit'
                    disabled={formIsLoading}
                    className='btn-success btn-lg mt-3 text-capitalize'
                  >
                    <strong>log in</strong>
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col text-center'>
                  <Link to='/signup'>
                    <button
                      placeholder='create account'
                      disabled={formIsLoading}
                      className='btn-secondary btn-lg mt-3 text-capitalize'
                    >
                      <strong>sign up</strong>
                    </button>
                  </Link>
                </div>
              </div>
              <div className='row'>
                <div className='col text-center'>
                  <Link to='/'>
                    <button
                      placeholder='home'
                      disabled={formIsLoading}
                      className='btn-primary btn-lg mt-3 text-capitalize'
                    >
                      <strong>home</strong>
                    </button>
                  </Link>
                </div>
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