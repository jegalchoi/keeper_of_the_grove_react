import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'

export const Signup = () => {
  const [state, dispatch] = useContext(PlantContext)

  const {
    username,
    email,
    password,
    password_confirmation,
    isLoading,
    error,
    permissions,
  } = state

  useEffect(() => {
    console.log('signup useEffect triggering')
    return permissions === 'LOGGED_IN' ? history.push('/') : undefined
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
            type: 'AUTH_FAILURE',
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
      <div>
        <ul>
          {error.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  console.log('signup')

  return (
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
              {isLoading ? 'creating account...' : 'create account'}
            </strong>
          </button>
          <br />
          <Link to='/login'>
            <button
              placeholder='login'
              className='btn-primary btn-lg mt-3 text-capitalize'
            >
              <strong>log in</strong>
            </button>
          </Link>
        </form>
        <br />
        <div>{error && handleErrors()}</div>
      </div>
    </div>
  )
}
