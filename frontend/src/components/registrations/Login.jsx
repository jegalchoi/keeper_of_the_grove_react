import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'

export const Login = () => {
  const [state, dispatch] = useContext(PlantContext)

  const { username, password, isLoading, error, permissions } = state

  useEffect(() => {
    console.log('login useEffect triggering')
    return permissions === 'LOGGED_IN' ? history.push('/') : undefined
  })

  const handleSubmit = e => {
    e.preventDefault()

    dispatch({ type: 'AUTH_LOGIN' })

    let user = {
      username,
      password,
    }

    const url = 'http://localhost:3001/login'

    axios
      .post(url, { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
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
      .catch(error => console.log('login api errors:', error))
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

  console.log('login')

  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h1 className='text-capitalize'>
          <strong>log in</strong>
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={e =>
              dispatch({
                type: 'field',
                fieldName: 'username',
                payload: e.target.value,
              })
            }
          />
          <br />
          <br />
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e =>
              dispatch({
                type: 'field',
                fieldName: 'password',
                payload: e.target.value,
              })
            }
          />
          <br />
          <button
            type='submit'
            placeholder='submit'
            disabled={isLoading}
            className='btn-success btn-lg mt-3 text-capitalize'
          >
            <strong>{isLoading ? 'logging in...' : 'log in'}</strong>
          </button>
          <br />
          <Link to='/signup'>
            <button
              placeholder='create account'
              className='btn-primary btn-lg mt-3 text-capitalize'
            >
              <strong>create account</strong>
            </button>
          </Link>
        </form>
        <br />
        <div>{error && handleErrors()}</div>
      </div>
    </div>
  )
}
