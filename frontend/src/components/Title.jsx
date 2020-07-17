import React from 'react'

export const Title = ({ name, description }) => {
  return (
    <div className='jumbotron text-center text-capitalize bg-light'>
      <h1 className='font-weight-bold display-5'>{name}</h1>
      <p className='text-monospace lead'>{description}</p>
    </div>
  )
}
