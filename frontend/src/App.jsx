import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GroveContext } from './context'
import { Navbar } from './components/navbar/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'
import { PlantList } from './components/plants/PlantList'
import { PlantDetail } from './components/plants/PlantDetail'
import { NewPlant } from './components/plants/NewPlant'
import { EditPlant } from './components/plants/EditPlant'
import { Default } from './components/Default.jsx'
import { withCookies } from 'react-cookie'

export const App = () => {
  // console.log('app')

  const [{ siteIsLoading, permissions, cookies }] = useContext(
    GroveContext
  )

  // console.log(state)

  return (
    <React.Fragment>
      <Navbar />
      {siteIsLoading ? null : (
        <Switch>
          <Route
            exact
            path='/'
            render={() => <PlantList cookies={cookies} />}
          />
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
            path='/account'
            render={() =>
              permissions === 'LOGGED_IN' ? (
                <EditUser />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            exact
            path='/new'
            render={() =>
              permissions === 'LOGGED_IN' ? (
                <NewPlant />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            exact
            path='/edit'
            render={() =>
              permissions === 'LOGGED_IN' ? (
                <EditPlant cookies={cookies} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            exact
            path='/details'
            render={() => <PlantDetail />}
          />
          <Route component={Default} />
        </Switch>
      )}
    </React.Fragment>
  )
}
