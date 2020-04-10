import React, { useContext, useEffect, useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'
import { PlantContext } from './context'
import { Default } from './components/Default.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'
// import axios from 'axios'
// import { loginStatus } from './context';

export const App = () => {
  console.log('app')
  // const { state, dispatch } = React.useContext(PlantContext);

  const [state, dispatch] = useContext(PlantContext)

  // console.log('fetching login status')

  // const url = 'http://localhost:3001/logged_in'

  // useEffect(() => {
  //   // setState(state => ({ data: state.data, loading: true }))
  //   axios
  //     .get(url, {
  //       withCredentials: true,
  //     })
  //     .then(response => {
  //       // dispatch({ type: 'AUTH_LOGIN' })
  //       dispatch({
  //         type: response.data.logged_in
  //           ? 'AUTH_SUCCESS'
  //           : 'AUTH_FAILURE',
  //         payload: response.data,
  //       })
  //     })
  //     .catch(error => console.log('check login api errors:', error))
  // }, [])

  return (
    <React.Fragment>
      <h1>{state.permissions}</h1>
      <Navbar />
      <Switch>
        <Route exact path='/' />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/edituser' component={EditUser} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  )
}
