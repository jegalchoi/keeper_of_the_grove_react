import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GroveContext } from '../../context'

export const PlantPortfolioLink = () => {
  const [{ permissions, displayUserPlants }, dispatch] = useContext(
    GroveContext
  )

  return (
    <div className='row'>
      <div className='col-10 mx-auto my-2 text-center'>
        <Link to='/' className='nav-link'>
          <button
            style={{ width: '200px' }}
            className='btn btn-outline-success text-capitalize'
            disabled={permissions === 'NOT_LOGGED_IN'}
            onClick={() =>
              dispatch({
                type: 'PLANT_DISPLAY_TOGGLE',
                payload: !displayUserPlants,
              })
            }
          >
            <strong>
              {permissions === 'LOGGED_IN'
                ? displayUserPlants
                  ? 'browse public plants'
                  : 'browse your portfolio'
                : 'public plants'}
            </strong>
          </button>
        </Link>
      </div>
    </div>
  )
}
