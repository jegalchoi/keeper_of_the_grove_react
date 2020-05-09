import React from 'react'
import { Link } from 'react-router-dom'

export const Default = () => {
  return (
    <React.Fragment>
      <div className='container text-center'>
        <div className='my-3 text-capitalize'>
          <h1>
            <strong>page not found</strong>
          </h1>
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
