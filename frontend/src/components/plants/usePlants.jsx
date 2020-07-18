export const plantsReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    case 'PLANT_DETAIL_FETCH_SUCCESS':
      const plant = action.payload.plant
      return {
        ...state,
        loading: false,
        name: plant.name,
        notes: plant.notes,
        water: plant.water,
        hidden: plant.hidden,
        ownerId: plant.user_id,
        image: plant.image,
        imageId: plant.image_id,
      }
    case 'EDIT_PLANT_FETCH_SUCCESS':
      const plantEdit = action.payload.plant
      const plantEditWater =
        plantEdit.water !== undefined
          ? new Date(plantEdit.water)
          : null
      return {
        ...state,
        loading: false,
        name: plantEdit.name,
        notes: plantEdit.notes,
        water: plantEditWater,
        hidden: plantEdit.hidden,
        originalImageUrl: plantEdit.image,
        originalImageId: plantEdit.image_id,
        ownerId: plantEdit.user_id,
      }
    case 'PLANT_CREATE_FAILURE':
      return {
        ...state,
        image: '',
        loading: false,
        errors: action.payload.errors,
      }
    case 'PLANT_ERRORS':
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      }
    case 'IMAGE_DETAIL_FETCH_SUCCESS':
      return {
        ...state,
        originalImagePublicId: action.payload.image.public_id,
      }
    case 'IMAGE_ERRORS':
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      }
    case 'PLANT_START_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'PLANT_FINISH_LOADING':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
