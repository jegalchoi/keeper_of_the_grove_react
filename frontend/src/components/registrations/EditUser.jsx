import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from './useForm'

export const EditUser = () => {
  const [state, dispatch] = useContext(PlantContext)

  const { userId, authIsLoading, errors } = state

  const [formState, formDispatch] = useReducer(formReducer, {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const {
    username,
    email,
    password,
    passwordConfirmation,
  } = formState

  const handleSubmit = e => {
    console.log('editing account')

    dispatch({ type: 'AUTH_LOADING' })

    let user = {
      username,
      email,
      password,
      passwordConfirmation,
    }

    const url = `http://localhost:3001/users/${userId}`

    axios
      .patch(url, { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'updated') {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: response.data,
          })
          history.push('/')
        } else {
          dispatch({
            type: 'AUTH_EDIT_USER_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch(error => console.log('edit user api errors:', error))

    e.preventDefault()
  }

  const deleteUser = () => {
    const url = `http://localhost:3001/users/${userId}`

    const confirmation = confirm('Are you sure?')
    if (confirmation) {
      console.log('user deletion submitted')
      dispatch({ type: 'AUTH_LOADING' })
      axios
        .delete(url, { withCredentials: true })
        .then(response => {
          if (response.data.status === 'destroyed') {
            dispatch({
              type: 'AUTH_LOGOUT',
            })
            history.push('/')
          } else {
            dispatch({
              type: 'AUTH_EDIT_USER_FAILURE',
              payload: response.data,
            })
          }
        })
        .catch(error => console.log('delete user api errors:', error))
    }
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.editUser.map(error => {
            return <li key={error}>{error}</li>
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
          <h1 className='text-capitalize'>
            <strong>edit account</strong>
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
              required={authIsLoading}
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
              required={authIsLoading}
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
              required={authIsLoading}
            />
            <br />
            <br />
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
              required={authIsLoading}
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
                  <strong>update account</strong>
                </button>
                <br />
                <button
                  placeholder='delete'
                  disabled={authIsLoading}
                  className='btn-danger btn-lg mt-3 text-uppercase'
                  onClick={deleteUser}
                >
                  <strong>delete account</strong>
                </button>
                <br />
                <Link to='/'>
                  <button
                    placeholder='home'
                    disabled={authIsLoading}
                    className='btn-primary btn-lg mt-3 text-capitalize'
                    onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
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
      <div>{errors.editUser && handleErrors()}</div>
    </React.Fragment>
  )
}
