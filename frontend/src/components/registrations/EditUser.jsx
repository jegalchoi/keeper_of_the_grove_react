import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { GroveContext } from '../../context'
import { registrationsReducer } from './useRegistrations'
import { ContainerWrapper } from '../ContainerWrapper'

export const EditUser = () => {
  const [
    { formIsLoading, userId, username, userEmail },
    dispatch,
  ] = useContext(GroveContext)

  const [
    { email, password, passwordConfirmation, loading, errors },
    editUserDispatch,
  ] = useReducer(registrationsReducer, {
    username,
    email: userEmail,
    password: '',
    passwordConfirmation: '',
    loading: false,
    errors: null,
  })

  const handleSubmit = (e) => {
    console.log('editing account')

    editUserDispatch({ type: 'AUTH_START_LOADING' })

    let user = {
      username,
      email,
      password,
      passwordConfirmation,
    }
    // const urlUserPatch = `http://localhost:3001/users/${userId}`
    const urlUserPatch = `/users/${userId}`
    axios
      .patch(urlUserPatch, { user }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'updated') {
          dispatch({
            type: 'AUTH_LOGGED_IN',
            payload: response.data,
          })
          history.push('/')
        } else {
          editUserDispatch({
            type: 'AUTH_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('EditUser/handleSubmit api errors:', error)
      )

    e.preventDefault()
  }

  const deleteUser = () => {
    const confirmation = confirm(
      'Are you sure you want to delete your account?'
    )

    if (confirmation) {
      console.log('user deletion submitted')

      dispatch({ type: 'FORM_START_LOADING' })

      // const urlUserDestroy = `http://localhost:3001/users/${userId}`
      const urlUserDestroy = `/users/${userId}`
      axios
        .delete(urlUserDestroy, { withCredentials: true })
        .then((response) => {
          // console.log(response.data)
          if (response.data.status === 'destroyed') {
            dispatch({
              type: 'AUTH_LOGOUT',
            })
            history.push('/')
          }
        })
        .catch((error) =>
          console.log('EditUser/deleteUser api errors:', error)
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
          <div className='row justify-content-center form-group'>
            <input
              type='text'
              placeholder='Username'
              disabled={formIsLoading || loading}
              value={username}
              onChange={(e) =>
                editUserDispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.target.value,
                })
              }
              required={!formIsLoading || !loading}
            />
          </div>
          <div className='row justify-content-center form-group'>
            <input
              type='email'
              placeholder='Email'
              disabled={formIsLoading || loading}
              value={email}
              onChange={(e) =>
                editUserDispatch({
                  type: 'field',
                  fieldName: 'email',
                  payload: e.target.value,
                })
              }
              required={!formIsLoading || !loading}
            />
          </div>
          <div className='row justify-content-center form-group'>
            <input
              type='password'
              placeholder='Password'
              disabled={formIsLoading || loading}
              value={password}
              onChange={(e) =>
                editUserDispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.target.value,
                })
              }
              required={!formIsLoading || !loading}
            />
          </div>
          <div className='row justify-content-center form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              disabled={formIsLoading || loading}
              value={passwordConfirmation}
              onChange={(e) =>
                editUserDispatch({
                  type: 'field',
                  fieldName: 'passwordConfirmation',
                  payload: e.target.value,
                })
              }
              required={!formIsLoading || !loading}
            />
          </div>
          {formIsLoading || loading ? (
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
                  <strong>update account</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <button
                  placeholder='delete'
                  className='btn-danger btn-lg mt-3 text-uppercase'
                  onClick={deleteUser}
                >
                  <strong>delete account</strong>
                </button>
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
