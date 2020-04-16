import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from '../useForm'

export const Signup = () => {
  const [state, dispatch] = useContext(PlantContext)
  const { formIsLoading } = state

  const [formState, formDispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: null,
  })
  const {
    username,
    email,
    password,
    passwordConfirmation,
    errors,
  } = formState

  const handleSubmit = e => {
    console.log('signing up')

    dispatch({ type: 'FORM_START_LOADING' })

    let user = {
      username,
      email,
      password,
      passwordConfirmation,
    }
    const url = 'http://localhost:3001/users'

    axios
      .post(url, { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({ type: 'FORM_DONE_LOADING' })
          formDispatch({
            type: 'AUTH_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch(error => console.log('signup api errors:', error))

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

  console.log('signup')

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize'>
            <strong>sign up</strong>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
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
            </div>
            <div className='form-group'>
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
            </div>
            <div className='form-group'>
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
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                value={passwordConfirmation}
                onChange={e =>
                  formDispatch({
                    type: 'field',
                    fieldName: 'passwordConfirmation',
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
                  <strong>create account</strong>
                </button>
                <br />
                <Link to='/login'>
                  <button
                    placeholder='login'
                    disabled={formIsLoading}
                    className='btn-primary btn-lg mt-3 text-capitalize'
                  >
                    <strong>log in</strong>
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
