import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from './useForm'

export const Login = () => {
  const [state, dispatch] = useContext(PlantContext)

  const { authIsLoading, errors } = state

  const [formState, formDispatch] = useReducer(formReducer, {
    username: '',
    password: '',
  })

  const { username, password } = formState

  const handleSubmit = e => {
    console.log('logging in')

    dispatch({ type: 'AUTH_LOADING' })

    let user = {
      username,
      password,
    }

    const url = 'http://localhost:3001/login'

    axios
      .post(url, { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({
            type: 'AUTH_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch(error => console.log('login api errors:', error))

    e.preventDefault()
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.login.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  console.log('login')

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize'>
            <strong>log in</strong>
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.target.value,
                })
              }
            />
            <br />
            <br />
            <input
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.target.value,
                })
              }
            />
            <br />
            {authIsLoading ? (
              <button
                disabled={authIsLoading}
                className='btn-success btn-lg mt-3 text-capitalize'
              >
                processing
              </button>
            ) : (
              <React.Fragment>
                <button
                  type='submit'
                  placeholder='submit'
                  disabled={authIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>log in</strong>
                </button>
                <br />
                <Link to='/signup'>
                  <button
                    placeholder='create account'
                    className='btn-primary btn-lg mt-3 text-capitalize'
                    onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
                  >
                    <strong>create account</strong>
                  </button>
                </Link>
              </React.Fragment>
            )}
          </form>
          <br />
        </div>
      </div>
      <div>{errors.login && handleErrors()}</div>
    </React.Fragment>
  )
}
