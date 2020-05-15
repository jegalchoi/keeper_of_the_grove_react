import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Default = () => {
  const location = useLocation()

  return (
    <React.Fragment>
      <div className='container text-center'>
        <div className='my-3 text-uppercase'>
          <h1 className='display-3'>404</h1>
          <h1>Error</h1>
          <h1>page not found</h1>
          <h3>
            the requested URL{' '}
            <span className='text-danger'>{location.pathname}</span>{' '}
            was not found
          </h3>
          <Link to='/'>
            <button
              placeholder='login'
              className='btn-primary btn-lg text-capitalize'
            >
              <strong>home</strong>
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}
