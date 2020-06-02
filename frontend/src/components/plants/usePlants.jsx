export const plantsReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    case 'PLANT_CREATE_FAILURE':
      return {
        ...state,
        image: '',
        plantIsLoading: false,
        errors: action.payload.errors,
      }
    case 'PLANT_UPDATE_FAILURE':
      return {
        ...state,
        plantIsLoading: false,
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
        imageId: plant.image_id,
      }
    case 'PLANT_DETAIL_FETCH_FAILURE':
      return {
        ...state,
        plantIsLoading: false,
        errors: action.payload.errors,
      }
    case 'IMAGE_DETAIL_FETCH_SUCCESS':
      return {
        ...state,
        originalImagePublicId: action.payload.image.public_id,
      }
    case 'IMAGE_DETAIL_FETCH_FAILURE':
      return {
        ...state,
        plantIsLoading: false,
        errors: action.payload.errors,
      }
    case 'PLANT_START_LOADING':
      return {
        ...state,
        plantIsLoading: true,
      }
    case 'PLANT_FINISH_LOADING':
      return {
        ...state,
        plantIsLoading: false,
      }
    case 'IMAGE_ERRORS':
      return {
        ...state,
        plantIsLoading: false,
        errors: action.payload.errors,
      }
    default:
      return state
  }
}
