import React, { useContext } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { GroveContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOilCan } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
  const [
    { siteIsLoading, permissions, username, displayUserPlants },
    dispatch,
  ] = useContext(GroveContext)

  const handleLogout = () => {
    // console.log('logging out')

    dispatch({ type: 'SITE_START_LOADING' })
    // const urlLoginStatus = 'http://localhost:3001/logout'
    const urlLogout = '/logout'
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
    <nav className='navbar navbar-expand-sm px-sm-5 sticky-top bg-success'>
      <Link to='/' className='navbar-brand'>
        <FontAwesomeIcon icon={faOilCan} size='3x' color='black' />
      </Link>
      {siteIsLoading ? null : (
        <ul className='navbar-nav align-items-center'>
          {permissions === 'LOGGED_IN' && (
            <React.Fragment>
              <li className='nav-item ml-auto'>
                <Link to='/' className='nav-link'>
                  <button
                    style={{ width: '200px' }}
                    className='btn btn-outline-primary text-capitalize'
                    onClick={() =>
                      dispatch({
                        type: 'PLANT_DISPLAY_TOGGLE',
                        payload: !displayUserPlants,
                      })
                    }
                  >
                    {displayUserPlants
                      ? 'show all plants'
                      : 'show only your plants'}
                  </button>
                </Link>
              </li>
              <li className='nav-item ml-auto'>
                <Link to='/new' className='nav-link text-capitalize'>
                  <strong>create new plant</strong>
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      )}
      <div className='ml-auto text-right'>
        <div>
          {siteIsLoading ? (
            <strong>loading...</strong>
          ) : (
            permissions === 'LOGGED_IN' && (
              <Link to='/account'>
                <h5>
                  <strong>{truncString(username, 20)}</strong>
                </h5>
              </Link>
            )
          )}
          {siteIsLoading ? null : permissions === 'LOGGED_IN' ? (
            <Link
              to='/'
              className='text-capitalize'
              onClick={handleLogout}
            >
              log out
            </Link>
          ) : (
            <Link to='/login' className='text-capitalize'>
              log in
            </Link>
          )}
        </div>
        {siteIsLoading
          ? null
          : permissions === 'NOT_LOGGED_IN' && (
              <Link to='/signup' className='text-capitalize'>
                sign up
              </Link>
            )}
      </div>
    </nav>
  )
}
