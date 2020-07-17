import React, { useContext, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { GroveContext } from '../../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOilCan } from '@fortawesome/free-solid-svg-icons'

const NavbarUser = lazy(() => import('./NavbarUser'))
const NavbarCreatePlantLink = lazy(() =>
  import('./NavbarCreatePlantLink')
)

export const Navbar = () => {
  const [{ permissions }, dispatch] = useContext(GroveContext)

  return (
    <div className='navbar navbar-dark bg-dark shadow-sm navbar-expand-sm px-sm-5 sticky-top'>
      <Link to='/' className='navbar-brand'>
        <FontAwesomeIcon icon={faOilCan} size='3x' color='seagreen' />
      </Link>
      <ul className='navbar-nav align-items-center'>
        {permissions === 'LOGGED_IN' && (
          <Suspense fallback={null}>
            <NavbarCreatePlantLink />
          </Suspense>
        )}
      </ul>
      <div className='ml-auto text-right'>
        <Suspense fallback={<div>Loading...</div>}>
          <NavbarUser />
        </Suspense>
      </div>
    </div>
  )
}
