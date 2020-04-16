import React, { useReducer, createContext, useEffect } from 'react'
import axios from 'axios'
export const PlantContext = createContext()

const initialState = {
  siteIsLoading: true,
  formIsLoading: false,
  permissions: 'NOT_LOGGED_IN',
  userId: '',
  username: '',
  plantsPublic: [],
  plantsUser: [],
  plantDetail: {},
  displayUserPlants: false,
  newPlantCreated: false,
  errors: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SITE_START_LOADING':
      return {
        ...state,
        siteIsLoading: true,
      }
    case 'FORM_START_LOADING':
      return {
        ...state,
        formIsLoading: true,
      }
    case 'FORM_DONE_LOADING':
      return {
        ...state,
        formIsLoading: false,
      }
    case 'AUTH_LOGGED_IN':
      return {
        ...state,
        permissions: 'LOGGED_IN',
        userId: action.payload.user.id,
        username: action.payload.user.username,
        siteIsLoading: false,
        formIsLoading: false,
      }
    case 'AUTH_NOT_LOGGED_IN':
      return {
        ...state,
        siteIsLoading: false,
        permissions: 'NOT_LOGGED_IN',
        userId: '',
        username: '',
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        siteIsLoading: false,
        permissions: 'NOT_LOGGED_IN',
        userId: '',
        username: '',
        plantsUser: [],
        displayUserPlants: false,
        plantDetail: {},
      }
    case 'PLANTS_PUBLIC_FETCH_SUCCESS':
      return {
        ...state,
        siteIsLoading: false,
        plantsPublic: action.payload.plants,
        newPlantCreated: false,
      }
    case 'PLANTS_USER_FETCH_SUCCESS':
      return {
        ...state,
        siteIsLoading: false,
        plantsUser: action.payload.plants,
        newPlantCreated: false,
      }
    case 'PLANT_FETCH_FAILURE':
      return {
        ...state,
        siteIsLoading: false,
        plantsPublic: [],
        plantsUser: [],
        newPlantCreated: false,
        errors: action.payload.errors,
      }
    case 'PLANT_DISPLAY_TOGGLE':
      return {
        ...state,
        displayUserPlants: action.payload,
      }
    case 'PLANT_NEW_TOGGLE':
      return {
        ...state,
        formIsLoading: false,
        newPlantCreated: true,
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: null,
      }
    default:
      return state
  }
}

export const PlantProvider = props => {
  console.log('context')

  const [state, dispatch] = useReducer(reducer, initialState)
  const { userId, displayUserPlants, newPlantCreated } = state

  useEffect(() => {
    console.log('fetching login status')

    const urlLoginStatus = 'http://localhost:3001/logged_in'

    axios
      .get(urlLoginStatus, { withCredentials: true })
      .then(response => {
        // console.log(response.data)
        dispatch({
          type: response.data.logged_in
            ? 'AUTH_LOGGED_IN'
            : 'AUTH_NOT_LOGGED_IN',
          payload: response.data,
        })
      })
      .catch(errors => console.log('check login api errors:', errors))
  }, [])

  useEffect(() => {
    console.log('fetching plants')

    const urlMyPlants = `http://localhost:3001/api/v1/users/${userId}/plants/`
    const urlAllPlants = `http://localhost:3001/api/v1/plants/`
    const urlPlants = displayUserPlants ? urlMyPlants : urlAllPlants
    // console.log(urlPlants)
    axios
      .get(urlPlants, { withCredentials: true })
      .then(response => {
        // console.log(response.data)
        dispatch({
          type:
            response.statusText === 'OK'
              ? displayUserPlants
                ? 'PLANTS_USER_FETCH_SUCCESS'
                : 'PLANTS_PUBLIC_FETCH_SUCCESS'
              : 'PLANTS_FETCH_FAILURE',
          payload: response.data,
        })
      })
      .catch(errors =>
        console.log('check plants api errors:', errors)
      )
  }, [newPlantCreated, displayUserPlants])

  return (
    <PlantContext.Provider value={[state, dispatch]}>
      {props.children}
    </PlantContext.Provider>
  )
}
