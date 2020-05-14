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
    case 'PLANT_DONE_LOADING':
      return {
        ...state,
        plantIsLoading: false,
      }
    case 'PLANT_SET_IMAGE_STATE':
      return {
        ...state,
        [action.stateName]: action.payload,
      }
    case 'PLANT_CLEAR_IMAGES':
      return {
        ...state,
        imageUrl: '',
        imageId: '',
        imagePublicId: '',
        images: [],
      }
    case 'IMAGE_ERRORS':
      return {
        ...state,
        plantIsLoading: false,
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
