import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarCreatePlantLink() {
  return (
    <li className='nav-item ml-auto'>
      <Link to='/new' className='nav-link text-capitalize text-light'>
        <strong>create new plant</strong>
      </Link>
    </li>
  )
}
