import React, { useContext } from 'react'
import { GroveContext } from '../../context'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { config } from '../../Constants'

export default function NavbarUser() {
  const [{ permissions, username }, dispatch] = useContext(
    GroveContext
  )

  const handleLogout = () => {
    // console.log('logging out')

    const urlLogout = config.url.API_URL_LOGOUT
    axios
      .delete(urlLogout, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch({ type: 'AUTH_LOGOUT' })
        history.push('/')
      })
    // .catch((error) => console.log(error))
  }

  const history = useHistory()

  const truncString = (str, max) => {
    return typeof str === 'string' && str.length > max
      ? str.substring(0, max) + '...'
      : str
  }

  return (
    <React.Fragment>
      {permissions === 'LOGGED_IN' && (
        <React.Fragment>
          <Link to='/account'>
            <h5 className='text-light'>
              <strong>{truncString(username, 20)}</strong>
            </h5>
          </Link>
          <Link
            to='/'
            className='text-capitalize'
            onClick={handleLogout}
          >
            <h5 className='text-light'>
              <strong>log out</strong>
            </h5>
          </Link>
        </React.Fragment>
      )}
      {permissions === 'NOT_LOGGED_IN' && (
        <div className='text-capitalize text-light'>
          <div>
            <Link to='/login'>
              <strong>log in</strong>
            </Link>
          </div>
          <div>
            <Link to='/signup'>
              <strong>sign up</strong>
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
