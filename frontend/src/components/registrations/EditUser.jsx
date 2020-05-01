import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { registrationsReducer } from './useRegistrations'
import { ContainerWrapper } from '../ContainerWrapper'

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
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>edit account</strong>
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
                    editUserDispatch({
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
                  type='email'
                  placeholder='Email'
                  value={email}
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
                    editUserDispatch({
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
          <div className='row'>
            <div className='col'>
              <div className='form-group text-center'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  value={passwordConfirmation}
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
                    <strong>update account</strong>
                  </button>
                </div>
              </div>
              <div className='row'>
                <div className='col text-center'>
                  <button
                    placeholder='delete'
                    disabled={formIsLoading}
                    className='btn-danger btn-lg mt-3 text-uppercase'
                    onClick={deleteUser}
                  >
                    <strong>delete account</strong>
                  </button>
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
