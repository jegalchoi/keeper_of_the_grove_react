import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from './useForm'

export const EditUser = () => {
  const [state, dispatch] = useContext(PlantContext)

  const { user_id, isLoading, errors } = state

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

    dispatch({ type: 'LOADING' })

    let user = {
      username,
      email,
      password,
      password_confirmation,
    }

    const url = `http://localhost:3001/users/${user_id}`

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
  }

  const deleteUser = () => {
    const url = `http://localhost:3001/users/${user_id}`

    const confirmation = confirm('Are you sure?')
    if (confirmation) {
      console.log('user deletion submitted')
      dispatch({ type: 'LOADING' })
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
                {isLoading ? 'updating account...' : 'update account'}
              </strong>
            </button>
            <br />
            <button
              placeholder='delete'
              onClick={deleteUser}
              className='btn-danger btn-lg mt-3 text-uppercase'
            >
              <strong>delete account</strong>
            </button>
            <br />
            <Link to='/'>
              <button
                placeholder='home'
                className='btn-primary btn-lg mt-3 text-capitalize'
                onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
              >
                <strong>home</strong>
              </button>
            </Link>
          </form>
          <br />
        </div>
      </div>
      <div>{errors.editUser && handleErrors()}</div>
    </React.Fragment>
  )
}
