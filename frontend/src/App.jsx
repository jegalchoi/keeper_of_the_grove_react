import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PlantContext } from './context'
import { Navbar } from './components/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'
import { PlantList } from './components/plants/PlantList'
import { NewPlant } from './components/plants/NewPlant'
import { PlantDetail } from './components/plants/PlantDetail'
import { Default } from './components/Default.jsx'
import { EditPlant } from './components/plants/EditPlant'

export const App = () => {
  console.log('app')

  const [{ siteIsLoading, permissions }] = useContext(PlantContext)

  // console.log(state)

  return (
    <React.Fragment>
      <Navbar />
      {siteIsLoading ? null : (
        <Switch>
          <Route exact path='/' render={() => <PlantList />} />
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
                <EditPlant />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <Route
            exact
            path='/details/:plantId'
            render={() => <PlantDetail />}
          />
          <Route component={Default} />
        </Switch>
      )}
    </React.Fragment>
  )
}
