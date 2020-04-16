import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from '../useForm'

export const Login = () => {
  const [state, dispatch] = useContext(PlantContext)
  const { formIsLoading } = state

  const [formState, formDispatch] = useReducer(formReducer, {
    username: '',
    password: '',
    errors: null,
  })
  const { username, password, errors } = formState

  const handleSubmit = e => {
    console.log('logging in')

    dispatch({ type: 'FORM_START_LOADING' })

    const user = {
      username,
      password,
    }
    const url = 'http://localhost:3001/login'

    axios
      .post(url, { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({ type: 'FORM_DONE_LOADING' })
          formDispatch({
            type: 'AUTH_LOGIN_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch(error => console.log('login api errors:', error))

    e.target.reset()
    e.preventDefault()
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.map(error => {
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
            <div className='form-group'>
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
                required
              />
            </div>
            <div className='form-group'>
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
                required
              />
            </div>
            {formIsLoading ? (
              <button
                disabled={formIsLoading}
                className='btn-success btn-lg mt-3 text-capitalize'
              >
                processing
              </button>
            ) : (
              <React.Fragment>
                <button
                  type='submit'
                  placeholder='submit'
                  disabled={formIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>log in</strong>
                </button>
                <br />
                <Link to='/signup'>
                  <button
                    placeholder='create account'
                    disabled={formIsLoading}
                    className='btn-primary btn-lg mt-3 text-capitalize'
                  >
                    <strong>create account</strong>
                  </button>
                </Link>
              </React.Fragment>
            )}
          </form>
        </div>
      </div>
      <br />
      <div>{errors && handleErrors()}</div>
    </React.Fragment>
  )
}
