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
        loading: false,
        errors: action.payload.errors,
      }
    case 'AUTH_START_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'AUTH_FINISH_LOADING':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
