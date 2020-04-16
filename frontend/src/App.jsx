import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PlantContext } from './context'
import { Navbar } from './components/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'
import { PlantList } from './components/plants/PlantList'
import { NewPlant } from './components/plants/NewPlant'
import { Default } from './components/Default.jsx'

export const App = () => {
  console.log('app')

  const [state] = useContext(PlantContext)
  const { siteIsLoading, permissions } = state

  console.log(state)

  return (
    <React.Fragment>
      <Navbar />
      {siteIsLoading ? (
        <h1>loading...</h1>
      ) : (
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
            path='/edituser'
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
          <Route component={Default} />
        </Switch>
      )}
    </React.Fragment>
  )
}
