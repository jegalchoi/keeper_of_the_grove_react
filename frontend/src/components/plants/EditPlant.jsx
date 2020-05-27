import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
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
  const [uploadedFiles, setUploadedFiles] = useState([])

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
    if (originalImageId === -1) {
      return
    }

    console.log('fetching image info')

    // const urlImageGet = `http://localhost:3001/api/v1/images/${originalImageId}`
    const urlImageGet = `/api/v1/images/${originalImageId}`
    axios
      .get(urlImageGet, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        editPlantDispatch({
          type:
            response.data.status !== 400 ||
            response.data.status !== 500
              ? 'IMAGE_DETAIL_FETCH_SUCCESS'
              : 'IMAGE_DETAIL_FETCH_FAILURE',
          payload: response.data,
        })
      })
      .catch((errors) =>
        console.log('editPlant/useEffect api errors:', errors)
      )
  }, [])

  const handleSubmit = (e) => {
    console.log('editing plant')

    editPlantDispatch({ type: 'PLANT_START_LOADING' })

    let plant = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: water === '' ? null : water,
      hidden,
      user_id: userId,
    }
    // const urlPlantEdit = `http://localhost:3001/api/v1/users/${userId}/plants/${id}`
    const urlPlantEdit = `/api/v1/users/${userId}/plants/${id}`

    if (
      imageId !== '' &&
      originalImageId !== -1 &&
      imagePublicId !== originalImagePublicId
    ) {
      deleteImage(originalImageId)
    }

    axios
      .patch(urlPlantEdit, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'updated') {
          if (uploadedFiles.length > 0) {
            uploadImage(id)
          } else {
            dispatch({
              type: 'PLANT_NEED_REFRESH',
            })
            history.push(`/details/${id}`)
          }
        } else {
          editPlantDispatch({
            type: 'PLANT_UPDATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('editPlant/handleSubmit api errors:', error)
      )

    e.target.reset()
    e.preventDefault()
  }

  const uploadImage = (plantId) => {
    console.log('uploading image')

    let image = new FormData()
    image.append('file', uploadedFiles[0])
    image.append('user_id', userId)
    image.append('plant_id', plantId)
    // const urlImageCreate = 'http://localhost:3001/api/v1/images'
    const urlImageCreate = '/api/v1/images'
    axios
      .post(urlImageCreate, image, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        const imageUrl = response.data.image.url
        const imageId = response.data.image.id
        if (response.data.status === 'created') {
          setImageForPlant(plantId, imageUrl, imageId)
        } else {
          editPlantDispatch({
            type: 'IMAGE_ERRORS',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('editPlant/uploadImage api errors:', error)
      )
  }

  const setImageForPlant = (plantId, imageUrl, imageId) => {
    console.log('setting image for plant')

    let plant = {
      image: imageUrl,
      image_id: imageId,
    }
    // const urlPlantPatch = `http://localhost:3001/api/v1/users/${userId}/plants/${plantId}`
    const urlPlantPatch = `/api/v1/users/${userId}/plants/${plantId}`
    axios
      .patch(urlPlantPatch, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'updated') {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push(`/details/${plantId}`)
        } else {
          editPlantDispatch({
            type: 'PLANT_UPDATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('Editplant/setImageForPlant api errors:', error)
      )
  }

  const deletePlant = () => {
    const confirmation = confirm(
      'Are you sure you want to delete your plant?'
    )

    if (confirmation) {
      console.log('deleting plant from edit plant')

      editPlantDispatch({ type: 'PLANT_START_LOADING' })

      // const urlPlantDestroy = `http://localhost:3001/api/v1/users/${userId}/plants/${id}`
      const urlPlantDestroy = `/api/v1/users/${userId}/plants/${id}`
      axios
        .delete(urlPlantDestroy, { withCredentials: true })
        .then((response) => {
          // console.log(response.data)
          if (response.data.status === 'destroyed') {
            dispatch({
              type: 'PLANT_NEED_REFRESH',
            })
            history.push('/')
          }
        })
        .catch((error) =>
          console.log('EditPlant/deletePlant api errors:', error)
        )
    }
  }

  const deleteImage = (imageId) => {
    console.log('deleting image from edit plant')

    // const urlImageDestroy = `http://localhost:3001/api/v1/images/${imageId}`
    const urlImageDestroy = `/api/v1/images/${imageId}`
    axios
      .delete(urlImageDestroy, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'destroyed') {
          console.log('image deleted from edit plant')
        } else {
          editPlantDispatch({
            type: 'IMAGE_ERRORS',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('EditPlant/deleteImage api errors:', error)
      )
  }

  const editPlantSetUploadedFiles = (files) => {
    setUploadedFiles([...uploadedFiles, ...files])
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

  console.log('edit plant')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>edit plant</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row justify-content-center form-group'>
            <input
              type='text'
              placeholder='Name'
              disabled={plantIsLoading}
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
                disabled={plantIsLoading}
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
                disabled={plantIsLoading}
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
                disabled={plantIsLoading}
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
          <div className='row justify-content-center'>
            <PlantDropzone
              setUploadedFiles={editPlantSetUploadedFiles}
              uploadedFiles={uploadedFiles}
            />
            {!plantIsLoading && uploadedFiles.length > 0 && (
              <input
                type='button'
                className='btn btn-outline-danger mt-3 text-uppercase'
                onClick={() => setUploadedFiles([])}
                value='clear queued photos'
              />
            )}
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
