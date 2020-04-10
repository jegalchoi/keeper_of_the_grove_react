import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { PlantContext } from './context'
import { Default } from './components/Default.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'

export const App = () => {
  console.log('app')

  const [state, dispatch] = useContext(PlantContext)

  return (
    <React.Fragment>
      <h1>{state.isLoading ? 'loading' : 'not loading'}</h1>
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
