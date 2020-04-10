import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PlantContext } from './context'
import { Default } from './components/Default.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'

export const App = () => {
  console.log('app')

  const [state, dispatch] = useContext(PlantContext)

  const { isLoading, permissions } = state

  return (
    <React.Fragment>
      <h1>{isLoading ? 'loading' : 'not loading'}</h1>
      <Navbar />
      {isLoading ? null : (
        <Switch>
          <Route exact path='/' />
          <Route
            exact
            path='/login'
            render={() =>
              permissions !== 'LOGGED_IN' ? (
                <Login />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            exact
            path='/signup'
            render={() =>
              permissions !== 'LOGGED_IN' ? (
                <Signup />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            exact
            path='/edituser'
            render={() =>
              permissions === 'LOGGED_IN' ? (
                <EditUser />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route component={Default} />
        </Switch>
      )}
    </React.Fragment>
  )
}
