import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PlantContext } from './context'
import { Default } from './components/Default.jsx'
import { Navbar } from './components/Navbar.jsx'
import { Login } from './components/registrations/Login.jsx'
import { Signup } from './components/registrations/Signup.jsx'
import { EditUser } from './components/registrations/EditUser.jsx'
import { PlantList } from './components/PlantList.jsx'

export const App = () => {
  console.log('app')

  const [state, dispatch] = useContext(PlantContext)

  const { isLoading, permissions, plants } = state

  console.log(state)

  return (
    <React.Fragment>
      {/* <h1>{isLoading ? 'loading' : 'not loading'}</h1> */}
      <Navbar />
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              plants.length !== 0 ? <PlantList /> : null
            }
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
