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
  isLoading: false,
  error: null,
  displayUserPlants: false,
  plants: [],
  detailPlant: {},
}

// componentDidMount() {
//   this.loginStatus()
// }

// export const loginStatus = () => {
//   const data = await axios
//     .get('http://localhost:3001/logged_in', { withCredentials: true })
//     .then(response => {
//       if (response.data.logged_in) {
//         this.handleLogin(response.data);
//       } else {
//         this.handleLogout();
//       }
//     })
//     .catch(error => console.log('check login api errors:', error));
// };

// handleLogin = data => {
//   this.setState({
//     isLoggedIn: 'LOGGED_IN',
//     user: data.user,
//     displayUserPlants: false,
//   })
// }

// handleLogout = () => {
//   this.setState({
//     isLoggedIn: 'NOT_LOGGED_IN',
//     displayUserPlants: false,
//     user: {},
//   })
// }

const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user_id: action.payload.user.id,
        username: action.payload.user.username,
        permissions: 'LOGGED_IN',
        error: null,
      }
    case 'AUTH_FAILURE':
      return {
        isLoading: false,
        username: '',
        permissions: 'NOT_LOGGED_IN',
        error: action.payload.errors,
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isLoading: false,
        user_id: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        permissions: 'NOT_LOGGED_IN',
        error: null,
        displayUserPlants: false,
        detailPlant: {},
      }
    case 'EDIT_USER_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload.errors,
      }
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    }
    default:
      return state
  }
}

export const PlantProvider = props => {
  console.log('context')
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log('fetching login status')

  const url = 'http://localhost:3001/logged_in'

  useEffect(() => {
    // setState(state => ({ data: state.data, loading: true }))
    dispatch({ type: 'AUTH_LOGIN' })
    axios
      .get(url, {
        withCredentials: true,
      })
      .then(response => {
        dispatch({
          type: response.data.logged_in
            ? 'AUTH_SUCCESS'
            : 'AUTH_FAILURE',
          payload: response.data,
        })
      })
      .catch(error => console.log('check login api errors:', error))
  }, [])

  return (
    <PlantContext.Provider value={[state, dispatch]}>
      {props.children}
    </PlantContext.Provider>
  )
}
