import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'

export const EditUser = () => {
  const [state, dispatch] = useContext(PlantContext)

  const {
    username,
    user_id,
    email,
    password,
    password_confirmation,
    isLoading,
    error,
    permissions,
  } = state

  useEffect(() => {
    console.log('edituser useEffect triggering')
    return permissions !== 'LOGGED_IN' ? history.push('/') : undefined
  }, [permissions])

  const handleSubmit = e => {
    e.preventDefault()

    dispatch({ type: 'AUTH_LOGIN' })

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
            type: 'EDIT_USER_FAILURE',
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
              type: 'AUTH_FAILURE',
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
      <div>
        <ul>
          {error.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  console.log('edit user')

  return (
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
              dispatch({
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
              dispatch({
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
              dispatch({
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
              dispatch({
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
            >
              <strong>home</strong>
            </button>
          </Link>
        </form>
        <br />
        <div>{error && handleErrors()}</div>
      </div>
    </div>
  )
}
