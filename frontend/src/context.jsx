import React, { useReducer, createContext, useEffect } from 'react'
import axios from 'axios'
export const PlantContext = createContext()

const initialState = {
  user: null,
  permissions: 'NOT_LOGGED_IN',
  user_id: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  isLoading: true,
  errors: { login: null, signup: null, editUser: null, plants: null },
  displayUserPlants: false,
  plants: [],
  detailPlant: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
        errors: {
          login: null,
          signup: null,
          editUser: null,
          plants: null,
        },
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user_id: action.payload.user.id,
        username: action.payload.user.username,
        permissions: 'LOGGED_IN',
        errors: {
          login: null,
          signup: null,
          editUser: null,
          plants: null,
        },
      }
    case 'AUTH_SIGNUP_FAILURE':
      return {
        ...state,
        isLoading: false,
        user_id: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        permissions: 'NOT_LOGGED_IN',
        errors: {
          login: null,
          signup: action.payload.errors,
          editUser: null,
          plants: null,
        },
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        user_id: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        permissions: 'NOT_LOGGED_IN',
        errors: {
          login: action.payload.errors,
          signup: null,
          editUser: null,
          plants: null,
        },
      }
    case 'AUTH_LOGOUT':
      return {
        isLoading: false,
        permissions: 'NOT_LOGGED_IN',
        user_id: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: {
          login: null,
          signup: null,
          editUser: null,
          plants: null,
        },
        displayUserPlants: false,
        detailPlant: {},
      }
    case 'AUTH_EDIT_USER_FAILURE':
      return {
        ...state,
        isLoading: false,
        errors: {
          login: null,
          signup: null,
          editUser: action.payload.errors,
          plants: null,
        },
      }
    case 'PLANT_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        plants: action.payload.plants,
        errors: {
          login: null,
          signup: null,
          editUser: null,
          plants: null,
        },
      }
    case 'PLANT_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        errors: {
          login: null,
          signup: null,
          editUser: null,
          plants: action.payload.errors,
        },
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {
          login: null,
          signup: null,
          editUser: null,
        },
      }
    default:
      return state
  }
}

export const PlantProvider = props => {
  console.log('context')

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    console.log('fetching login status')

    // dispatch({ type: 'LOADING' })

    const urlLoginStatus = 'http://localhost:3001/logged_in'

    axios
      .get(urlLoginStatus, { withCredentials: true })
      .then(response => {
        // console.log(response.data)
        dispatch({
          type: response.data.logged_in
            ? 'AUTH_SUCCESS'
            : 'AUTH_FAILURE',
          payload: response.data,
        })
      })
      .catch(errors => console.log('check login api errors:', errors))

    console.log('fetching plants')

    // dispatch({ type: 'LOADING' })

    const urlMyPlants = `http://localhost:3001/api/v1/users/${initialState.user_id}/plants/`
    const urlAllPlants = `http://localhost:3001/api/v1/plants/`
    const urlPlants = initialState.displayUserPlants
      ? urlMyPlants
      : urlAllPlants
    console.log(urlPlants)
    axios
      .get(urlPlants, { withCredentials: true })
      .then(response => {
        // console.log(response.data)
        dispatch({
          type:
            response.statusText === 'OK'
              ? 'PLANT_FETCH_SUCCESS'
              : 'PLANT_FETCH_FAILURE',
          payload: response.data,
        })
      })
      .catch(errors =>
        console.log('check plants api errors:', errors)
      )
  }, [])

  return (
    <PlantContext.Provider value={[state, dispatch]}>
      {props.children}
    </PlantContext.Provider>
  )
}
