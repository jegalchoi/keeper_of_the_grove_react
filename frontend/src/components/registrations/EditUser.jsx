import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { registrationsReducer } from './useRegistrations'

export const EditUser = () => {
  const [{ formIsLoading, userId }, dispatch] = useContext(
    PlantContext
  )

  const [
    { username, email, password, passwordConfirmation, errors },
    editUserDispatch,
  ] = useReducer(registrationsReducer, {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: null,
  })

  const handleSubmit = (e) => {
    console.log('editing account')

    dispatch({ type: 'FORM_START_LOADING' })

    let user = {
      username,
      email,
      password,
      passwordConfirmation,
    }
    const url = `http://localhost:3001/users/${userId}`

    axios
      .patch(url, { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'updated') {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({ type: 'FORM_DONE_LOADING' })
          editUserDispatch({
            type: 'AUTH_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) => console.log('edit user api errors:', error))

    e.target.reset()
    e.preventDefault()
  }

  const deleteUser = () => {
    const url = `http://localhost:3001/users/${userId}`
    const confirmation = confirm(
      'Are you sure you want to delete your account?'
    )

    if (confirmation) {
      console.log('user deletion submitted')
      dispatch({ type: 'FORM_START_LOADING' })
      axios
        .delete(url, { withCredentials: true })
        .then((response) => {
          if (response.data.status === 'destroyed') {
            dispatch({
              type: 'AUTH_LOGOUT',
            })
            history.push('/')
          }
        })
        .catch((error) =>
          console.log('delete user api errors:', error)
        )
    }
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

  console.log('edit user')

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize text-center'>
            <strong>edit account</strong>
          </h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Username'
                value={username}
                className='position-relative mx-auto d-block'
                onChange={(e) =>
                  editUserDispatch({
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
                className='position-relative mx-auto d-block'
                onChange={(e) =>
                  editUserDispatch({
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
                className='position-relative mx-auto d-block'
                onChange={(e) =>
                  editUserDispatch({
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
                className='position-relative mx-auto d-block'
                onChange={(e) =>
                  editUserDispatch({
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
                disabled
                className='btn-primary btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
              >
                processing
              </button>
            ) : (
              <React.Fragment>
                <button
                  type='submit'
                  placeholder='submit'
                  disabled={formIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
                >
                  <strong>update account</strong>
                </button>
                <button
                  placeholder='delete'
                  disabled={formIsLoading}
                  className='btn-danger btn-lg mt-3 text-uppercase position-relative mx-auto d-block'
                  onClick={deleteUser}
                >
                  <strong>delete account</strong>
                </button>
                <Link to='/'>
                  <button
                    placeholder='home'
                    disabled={formIsLoading}
                    className='btn-primary btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
                  >
                    <strong>home</strong>
                  </button>
                </Link>
              </React.Fragment>
            )}
          </form>
          <br />
        </div>
      </div>
      <div>{errors && handleErrors()}</div>
    </React.Fragment>
  )
}
