import React, { useContext, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { GroveContext } from './context'
import { Navbar } from './components/navbar/Navbar.jsx'
import { Default } from './components/Default.jsx'

export const App = () => {
  // console.log('app')

  const [{ permissions }] = useContext(GroveContext)
  const Login = lazy(() =>
    import('./components/registrations/Login.jsx').then((module) => ({
      default: module.Login,
    }))
  )
  const Signup = lazy(() =>
    import(
      './components/registrations/Signup.jsx'
    ).then((module) => ({ default: module.Signup }))
  )
  const EditUser = lazy(() =>
    import(
      './components/registrations/EditUser.jsx'
    ).then((module) => ({ default: module.EditUser }))
  )
  const PlantList = lazy(() =>
    import('./components/plants/PlantList').then((module) => ({
      default: module.PlantList,
    }))
  )
  const PlantDetail = lazy(() =>
    import('./components/plants/PlantDetail').then((module) => ({
      default: module.PlantDetail,
    }))
  )
  const NewPlant = lazy(() =>
    import('./components/plants/NewPlant').then((module) => ({
      default: module.NewPlant,
    }))
  )
  const EditPlant = lazy(() =>
    import('./components/plants/EditPlant').then((module) => ({
      default: module.EditPlant,
    }))
  )

  // console.log(state)

  return (
    <React.Fragment>
      <Navbar />
      <Suspense fallback={null}>
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
            path='/details'
            render={() => <PlantDetail />}
          />
          <Route component={Default} />
        </Switch>
      </Suspense>
    </React.Fragment>
  )
}
