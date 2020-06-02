export const registrationsReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        errors: action.payload.errors,
      }
    case 'AUTH_LOGIN_FAILURE':
      return {
        username: '',
        password: '',
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
