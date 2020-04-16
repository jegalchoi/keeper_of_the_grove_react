export const formReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    case 'AUTH_FAILURE':
      return {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: action.payload.errors,
      }
    case 'AUTH_LOGIN_FAILURE':
      return {
        username: '',
        password: '',
        errors: action.payload.errors,
      }
    case 'PLANT_CREATE_FAILURE':
      return {
        name: '',
        notes: '',
        water: '',
        hidden: true,
        image: '',
        errors: action.payload.errors,
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
