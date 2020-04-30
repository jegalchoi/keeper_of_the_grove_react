export const plantsReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
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
    case 'PLANT_UPDATE_FAILURE':
      return {
        errors: action.payload.errors,
      }
    case 'PLANT_DETAIL_FETCH_SUCCESS':
      const plant = action.payload.plant
      return {
        ...state,
        plantIsLoading: false,
        name: plant.name,
        notes: plant.notes,
        water: plant.water,
        hidden: plant.hidden,
        ownerId: plant.user_id,
        image: plant.image,
      }
    case 'PLANT_DETAIL_FETCH_FAILURE':
      return {
        ...state,
        plantIsLoading: false,
        errors: action.payload.errors,
      }
    case 'PLANT_DETAIL_START_LOADING':
      return {
        ...state,
        plantIsLoading: true,
      }
    case 'PLANT_DETAIL_DONE_LOADING':
      return {
        ...state,
        plantIsLoading: false,
      }
    case 'PLANT_SET_IMAGES':
      return {
        ...state,
        images: action.payload,
      }
    case 'PLANT_UPLOADING_IMAGES':
      return {
        ...state,
        uploading: true,
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
