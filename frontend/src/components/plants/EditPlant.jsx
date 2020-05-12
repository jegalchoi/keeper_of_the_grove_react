import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { plantsReducer } from './usePlants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PlantDropzone } from './PlantDropzone'
import { ContainerWrapper } from '../ContainerWrapper'

export const EditPlant = () => {
  const [{ userId, plantDetail }, dispatch] = useContext(PlantContext)

  const [
    {
      plantIsLoading,
      id,
      name,
      notes,
      water,
      hidden,
      imageUrl,
      imageId,
      imagePublicId,
      originalImageUrl,
      originalImageId,
      originalImagePublicId,
      ownerId,
      errors,
    },
    editPlantDispatch,
  ] = useReducer(plantsReducer, {
    plantIsLoading: false,
    id: plantDetail.id,
    name: plantDetail.name,
    notes: plantDetail.notes,
    water: plantDetail.water,
    hidden: plantDetail.hidden,
    imageUrl: '',
    imageId: '',
    imagePublicId: '',
    originalImageUrl: plantDetail.image,
    originalImageId: plantDetail.imageId,
    originalImagePublicId: '',
    ownerId: plantDetail.ownerId,
    errors: null,
  })

  useEffect(() => {
    if (originalImageId === null) {
      return
    }

    console.log('fetching image info')

    const urlImageGet = `http://localhost:3001/api/v1/images/${originalImageId}`

    axios
      .get(urlImageGet, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        editPlantDispatch({
          type:
            response.data.status !== 400
              ? 'IMAGE_DETAIL_FETCH_SUCCESS'
              : 'IMAGE_DETAIL_FETCH_FAILURE',
          payload: response.data,
        })
      })
      .catch((errors) =>
        console.log('check plant detail api errors:', errors)
      )
  }, [])

  const deleteImage = (id) => {
    console.log('deleting image from edit plant')

    const urlImageDestroy = `http://localhost:3001/api/v1/images/${id}`

    axios
      .delete(urlImageDestroy, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'destroyed') {
          console.log('image deleted from edit plant')
        } else {
          editPlantDispatchSetImageState({
            type: 'IMAGE_ERRORS',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('delete image api errors:', error)
      )
  }

  const handleSubmit = (e) => {
    console.log('editing plant')

    editPlantDispatch({ type: 'PLANT_START_LOADING' })

    let plant = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: water === '' ? null : water,
      hidden,
      image:
        originalImageUrl === '' && imageUrl === ''
          ? 'https://placeimg.com/320/240/nature'
          : imageUrl || originalImageUrl,
      image_id: imageId || originalImageId,
      user_id: userId,
    }
    console.log(plant)

    const urlPlantEdit = `http://localhost:3001/api/v1/users/${userId}/plants/${id}`

    if (
      imageId !== '' &&
      originalImageId !== null &&
      imageId !== originalImageId
    ) {
      deleteImage(originalImageId)
    }

    axios
      .patch(urlPlantEdit, { plant }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'updated') {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push(`/details/${id}`)
        } else {
          editPlantDispatch({
            type: 'PLANT_UPDATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) => console.log('edit plant api errors:', error))

    e.target.reset()
    e.preventDefault()
  }

  const deletePlant = () => {
    const urlPlantDestroy = `http://localhost:3001/api/v1/users/${userId}/plants/${id}`

    const confirmation = confirm(
      'Are you sure you want to delete your plant?'
    )

    if (confirmation) {
      console.log('deleting plant from edit plant')

      editPlantDispatch({ type: 'PLANT_START_LOADING' })

      deleteImage(originalImageId)

      axios
        .delete(urlPlantDestroy, { withCredentials: true })
        .then((response) => {
          if (response.data.status === 'destroyed') {
            dispatch({
              type: 'PLANT_NEED_REFRESH',
            })
            history.push('/')
          }
        })
        .catch((error) =>
          console.log('delete plant api errors:', error)
        )
    }
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.map((error) => {
            return (
              <li key={error}>
                <strong>{error}</strong>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  // const stripHtmlEntities = (str) => {
  //   return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // }

  const editPlantDispatchSetImageState = (state, value) => {
    editPlantDispatch({
      type: 'PLANT_SET_IMAGE_STATE',
      stateName: state,
      payload: value,
    })
  }

  const editPlantDispatchClearImages = () => {
    editPlantDispatch({
      type: 'PLANT_CLEAR_IMAGES',
    })
  }

  console.log('edit plant')

  return (
    <ContainerWrapper>
      <h1>
        imageUrl:{' '}
        {imageUrl === ''
          ? 'empty string'
          : imageUrl === null
          ? 'null'
          : imageUrl}
      </h1>
      <h1>
        imageId:{' '}
        {imageId === ''
          ? 'empty string'
          : imageId === null
          ? 'null'
          : imageId}
      </h1>
      <h1>
        imagePublicId:{' '}
        {imagePublicId === ''
          ? 'empty string'
          : imagePublicId === null
          ? 'null'
          : imagePublicId}
      </h1>
      <h1>
        originalImageUrl:{' '}
        {originalImageUrl === ''
          ? 'empty string'
          : originalImageUrl === null
          ? 'null'
          : originalImageUrl}
      </h1>
      <h1>
        originalImageId:{' '}
        {originalImageId === ''
          ? 'empty string'
          : originalImageId === null
          ? 'null'
          : originalImageId}
      </h1>
      <h1>
        originalImagePublicId:{' '}
        {originalImagePublicId === ''
          ? 'empty string'
          : originalImagePublicId === null
          ? 'null'
          : originalImagePublicId}
      </h1>
      <h1 className='text-capitalize text-center'>
        <strong>edit plant</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row justify-content-center form-group'>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) =>
                editPlantDispatch({
                  type: 'field',
                  fieldName: 'name',
                  payload: e.target.value,
                })
              }
              required
            />
          </div>
          <br />
          <div className='row form-group text-center'>
            <div className='col'>
              <DatePicker
                inline
                showTimeSelect
                selected={water}
                onChange={(date) => {
                  // console.log(date)
                  return editPlantDispatch({
                    type: 'field',
                    fieldName: 'water',
                    payload: date,
                  })
                }}
              />
              <small id='waterHelp' className='form-text text-muted'>
                Select date and time that plant was last watered.
              </small>
            </div>
          </div>
          <br />
          <div className='row form-group text-center'>
            <div className='col'>
              <textarea
                placeholder='Notes'
                value={notes}
                onChange={(e) =>
                  editPlantDispatch({
                    type: 'field',
                    fieldName: 'notes',
                    payload: e.target.value,
                  })
                }
              />
              <small id='notesHelp' className='form-text text-muted'>
                Separate each note with a comma.
              </small>
            </div>
          </div>
          <div className='row form-check text-center'>
            <div className='col'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={hidden}
                id='plantHidden'
                onChange={(e) =>
                  editPlantDispatch({
                    type: 'field',
                    fieldName: 'hidden',
                    payload: e.target.checked,
                  })
                }
              />
              <label
                className='form-check-label text-capitalize'
                htmlFor='plantHidden'
              >
                private
              </label>
              <small id='hiddenHelp' className='form-text text-muted'>
                Everyone can view public plants.
              </small>
            </div>
          </div>
          <br />
          <div className='row'>
            <PlantDropzone
              userId={userId}
              imageId={imageId}
              imagePublicId={imagePublicId}
              plantDispatchSetImageState={
                editPlantDispatchSetImageState
              }
              plantDispatchClearImages={editPlantDispatchClearImages}
            />
          </div>
          {plantIsLoading
            ? null
            : userId === ownerId && (
                <div className='row justify-content-center'>
                  <button
                    type='submit'
                    placeholder='submit'
                    className='btn-success btn-lg mt-3 text-capitalize'
                  >
                    <strong>update plant</strong>
                  </button>
                </div>
              )}
        </div>
      </form>
      {plantIsLoading
        ? null
        : userId === ownerId && (
            <React.Fragment>
              <div className='row justify-content-center'>
                <button
                  placeholder='delete'
                  className='btn-danger btn-lg mt-3 text-uppercase'
                  onClick={deletePlant}
                >
                  <strong>delete plant</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/'>
                  <button
                    placeholder='home'
                    className='btn-primary btn-lg mt-3 text-capitalize'
                  >
                    <strong>home</strong>
                  </button>
                </Link>
              </div>
            </React.Fragment>
          )}
      {!plantIsLoading ? null : (
        <div className='row justify-content-center'>
          <button
            disabled
            className='btn-success btn-lg mt-3 text-capitalize'
          >
            processing
          </button>
        </div>
      )}
      <br />
      <div>{errors && handleErrors()}</div>
    </ContainerWrapper>
  )
}
