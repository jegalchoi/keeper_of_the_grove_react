import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from './useForm'

export const Signup = () => {
  const [state, dispatch] = useContext(PlantContext)

  const { isLoading, errors } = state

  const [formState, formDispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const {
    username,
    email,
    password,
    password_confirmation,
  } = formState

  const handleSubmit = e => {
    e.preventDefault()

    console.log('signing up')
    dispatch({ type: 'LOADING' })

    let user = {
      username,
      email,
      password,
      password_confirmation,
    }

    const url = 'http://localhost:3001/users'

    axios
      .post(url, { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({
            type: 'AUTH_SIGNUP_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch(error => console.log('signup api errors:', error))
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.signup.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  console.log('signup')

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize'>
            <strong>sign up</strong>
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.target.value,
                })
              }
              required
            />
            <br />
            <br />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'email',
                  payload: e.target.value,
                })
              }
              required
            />
            <br />
            <br />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.target.value,
                })
              }
              required
            />
            <br />
            <br />
            <input
              type='password'
              placeholder='Confirm Password'
              value={password_confirmation}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'password_confirmation',
                  payload: e.target.value,
                })
              }
              required
            />
            <br />

            <button
              type='submit'
              placeholder='submit'
              disabled={isLoading}
              className='btn-success btn-lg mt-3 text-capitalize'
            >
              <strong>
                {isLoading ? 'creating account...' : 'create account'}
              </strong>
            </button>
            <br />
            <Link to='/login'>
              <button
                placeholder='login'
                className='btn-primary btn-lg mt-3 text-capitalize'
                onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
              >
                <strong>log in</strong>
              </button>
            </Link>
          </form>
          <br />
        </div>
      </div>
      <div>{errors.signup && handleErrors()}</div>
    </React.Fragment>
  )
}
