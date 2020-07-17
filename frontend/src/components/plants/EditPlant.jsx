import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { GroveContext } from '../../context'
import { plantsReducer } from './usePlants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PlantDropzone } from './PlantDropzone'
import { useCookies } from 'react-cookie'
import { ContainerWrapper } from '../ContainerWrapper'
import enUS from 'date-fns/locale/en-US'
import { parseISO, format } from 'date-fns'
import { config } from '../../Constants'

export const EditPlant = () => {
  const [{ userId }, dispatch] = useContext(GroveContext)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [cookies] = useCookies(['plantId'])

  const [
    {
      loading,
      plantId,
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
    loading: false,
    plantId: cookies.plantId,
    name: '',
    notes: '',
    water: '',
    hidden: '',
    imageUrl: '',
    imageId: '',
    imagePublicId: '',
    originalImageUrl: '',
    originalImageId: '',
    originalImagePublicId: '',
    ownerId: '',
    errors: null,
  })

  useEffect(() => {
    const urlPlantGet = config.url.API_URL_PLANT_GET + `${plantId}`
    axios
      .get(urlPlantGet, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        editPlantDispatch({
          type:
            response.data.status !== 400 ||
            response.data.status !== 500
              ? 'PLANT_DETAIL_FETCH_SUCCESS'
              : 'PLANT_ERRORS',
          payload: response.data,
        })
      })
  }, [])

  useEffect(() => {
    if (originalImageId === '') {
      return
    }

    // console.log('fetching image info')

    const urlImageGet =
      config.url.API_URL_IMAGE_GET + `${originalImageId}`
    axios
      .get(urlImageGet, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        editPlantDispatch({
          type:
            response.data.status !== 400 ||
            response.data.status !== 500
              ? 'IMAGE_DETAIL_FETCH_SUCCESS'
              : 'IMAGE_ERRORS',
          payload: response.data,
        })
      })
    // .catch((errors) =>
    //   console.log('editPlant/useEffect api errors:', errors)
    // )
  }, [originalImageId])

  const handleSubmit = (e) => {
    // console.log('editing plant')

    editPlantDispatch({ type: 'PLANT_START_LOADING' })

    let plant = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: water,
      hidden,
      user_id: userId,
    }
    const urlPlantPatch =
      config.url.API_URL_PLANT_PATCH + `${userId}/plants/${plantId}`

    if (
      imageId !== '' &&
      originalImageId !== -1 &&
      imagePublicId !== originalImagePublicId
    ) {
      deleteImage(originalImageId)
    }

    axios
      .patch(urlPlantPatch, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'updated') {
          if (uploadedFiles.length > 0) {
            uploadImage(plantId)
          } else {
            dispatch({
              type: 'PLANT_NEED_REFRESH',
            })
            history.push(`/details`)
          }
        } else {
          editPlantDispatch({
            type: 'PLANT_ERRORS',
            payload: response.data,
          })
        }
      })
    // .catch((error) =>
    //   console.log('editPlant/handleSubmit api errors:', error)
    // )

    e.target.reset()
    e.preventDefault()
  }

  const uploadImage = (plantId) => {
    // console.log('uploading image')

    let image = new FormData()
    image.append('file', uploadedFiles[0])
    image.append('user_id', userId)
    image.append('plant_id', plantId)
    const urlImageCreate = config.url.API_URL_IMAGE_CREATE
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
    // .catch((error) =>
    //   console.log('editPlant/uploadImage api errors:', error)
    // )
  }

  const setImageForPlant = (plantId, imageUrl, imageId) => {
    // console.log('setting image for plant')

    let plant = {
      image: imageUrl,
      image_id: imageId,
    }
    const urlPlantPatch =
      config.url.API_URL_PLANT_PATCH + `${userId}/plants/${plantId}`
    axios
      .patch(urlPlantPatch, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'updated') {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push(`/details`)
        } else {
          editPlantDispatch({
            type: 'PLANT_ERRORS',
            payload: response.data,
          })
        }
      })
    // .catch((error) =>
    //   // console.log('Editplant/setImageForPlant api errors:', error)
    // )
  }

  const deletePlant = () => {
    const confirmation = confirm(
      'Are you sure you want to delete your plant?'
    )

    if (confirmation) {
      // console.log('deleting plant from edit plant')

      editPlantDispatch({ type: 'PLANT_START_LOADING' })

      const urlPlantDestroy =
        config.url.API_URL_PLANT_DESTROY +
        `${userId}/plants/${plantId}`
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
      // .catch((error) =>
      //   // console.log('EditPlant/deletePlant api errors:', error)
      // )
    }
  }

  const deleteImage = (imageId) => {
    // console.log('deleting image from edit plant')

    const urlImageDestroy =
      config.url.API_URL_IMAGE_DESTROY + `${imageId}`
    axios
      .delete(urlImageDestroy, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'destroyed') {
          // console.log('image deleted from edit plant')
        } else {
          editPlantDispatch({
            type: 'IMAGE_ERRORS',
            payload: response.data,
          })
        }
      })
    // .catch((error) =>
    //   // console.log('EditPlant/deleteImage api errors:', error)
    // )
  }

  const editPlantSetUploadedFiles = (files) => {
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const history = useHistory()

  const handleErrors = () => {
    // console.log('rendering errors')
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

  // console.log('edit plant')

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
              disabled={loading}
              value={name}
              onChange={(e) =>
                editPlantDispatch({
                  type: 'field',
                  fieldName: 'name',
                  payload: e.target.value,
                })
              }
              required={!loading}
            />
          </div>
          <br />
          <div className='row form-group text-center'>
            <div className='col'>
              <DatePicker
                inline
                showTimeSelect
                disabled={loading}
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
                disabled={loading}
                value={notes}
                onChange={(e) =>
                  editPlantDispatch({
                    type: 'field',
                    fieldName: 'notes',
                    payload: e.target.value,
                  })
                }
                style={{ width: '300px' }}
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
                disabled={loading}
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
            {!loading && uploadedFiles.length > 0 && (
              <input
                type='button'
                className='btn btn-outline-danger mt-3 text-uppercase'
                onClick={() => setUploadedFiles([])}
                value='clear queued photos'
              />
            )}
          </div>
          {loading
            ? null
            : userId === ownerId && (
                <div className='row justify-content-center'>
                  <button
                    type='submit'
                    placeholder='submit'
                    className='btn-success btn-lg mt-3 text-capitalize'
                    style={{ width: '200px' }}
                  >
                    <strong>update plant</strong>
                  </button>
                </div>
              )}
        </div>
      </form>
      {loading
        ? null
        : userId === ownerId && (
            <React.Fragment>
              <div className='row justify-content-center'>
                <button
                  placeholder='delete'
                  className='btn-danger btn-lg mt-3 text-uppercase'
                  onClick={deletePlant}
                  style={{ width: '200px' }}
                >
                  <strong>delete plant</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/'>
                  <button
                    placeholder='home'
                    className='btn-primary btn-lg mt-3 text-capitalize'
                    style={{ width: '200px' }}
                  >
                    <strong>home</strong>
                  </button>
                </Link>
              </div>
            </React.Fragment>
          )}
      {!loading ? null : (
        <div className='row justify-content-center'>
          <button
            disabled
            className='btn-success btn-lg mt-3 text-capitalize'
            style={{ width: '200px' }}
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
