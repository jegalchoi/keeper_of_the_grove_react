import React from 'react'
import { Link } from 'react-router-dom'

export const Default = () => {
  return (
    <React.Fragment>
      <div className='d-flex justify-content-center'>
        <div className='my-5'>
          <h1 className='text-capitalize'>
            <strong>page not found</strong>
          </h1>
          <Link to='/'>
            <button
              placeholder='login'
              className='btn-primary btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
            >
              <strong>home</strong>
            </button>
          </Link>
        </div>
      </div>
      <br />
    </React.Fragment>
  )
}
