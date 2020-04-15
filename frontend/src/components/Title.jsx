import React from 'react'

export const Title = ({ name, description }) => {
  return (
    <div className='row'>
      <div className='col-10 mx-auto my-2 text-center text-capitalize'>
        <h1 className='font-weight-bold'>{name}</h1>
        <h5>{description}</h5>
      </div>
    </div>
  )
}
