import React, { useContext, useReducer, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { plantsReducer } from './usePlants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PlantDropzone } from './PlantDropzone'
import { ContainerWrapper } from '../ContainerWrapper'
import enUS from 'date-fns/locale/en-US'
import { parseISO, format } from 'date-fns'

export const NewPlant = () => {
  const [{ userId }, dispatch] = useContext(PlantContext)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const [
    {
      plantIsLoading,
      name,
      notes,
      water,
      hidden,
      imageUrl,
      imageId,
      imagePublicId,
      errors,
    },
    newPlantDispatch,
  ] = useReducer(plantsReducer, {
    plantIsLoading: false,
    name: '',
    notes: '',
    water: '',
    hidden: true,
    imageUrl: '',
    imageId: '',
    imagePublicId: '',
    errors: null,
  })

  const handleSubmit = (e) => {
    console.log('creating plant')

    newPlantDispatch({ type: 'PLANT_START_LOADING' })

    let plant = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: water === '' ? null : water,
      hidden,
      user_id: userId,
    }
    // const urlPlantCreate = 'http://localhost:3001/api/v1/plants'
    const urlPlantCreate = '/api/v1/plants'
    axios
      .post(urlPlantCreate, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        const plantId = response.data.plant.id
        if (response.data.status === 'created') {
          if (uploadedFiles.length > 0) {
            uploadImage(plantId)
          } else {
            dispatch({
              type: 'PLANT_NEED_REFRESH',
            })
            history.push(`/details/${plantId}`)
          }
        } else {
          newPlantDispatch({
            type: 'PLANT_CREATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('NewPlant/handleSubmit api errors:', error)
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
          newPlantDispatch({
            type: 'IMAGE_ERRORS',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('NewPlant/uploadImage api errors:', error)
      )
  }

  const setImageForPlant = (plantId, imageUrl, imageId) => {
    console.log('setting image for plant')

    let plant = {
      image: imageUrl,
      image_id: imageId,
    }
    // const urlPlantEdit = `http://localhost:3001/api/v1/users/${userId}/plants/${plantId}`
    const urlPlantEdit = `/api/v1/users/${userId}/plants/${plantId}`
    axios
      .patch(urlPlantEdit, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.data.status === 'updated') {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push(`/details/${plantId}`)
        } else {
          newPlantDispatch({
            type: 'PLANT_UPDATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('NewPlant/setImageForPlant api errors:', error)
      )
  }

  const newPlantSetUploadedFiles = (files) => {
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.map((error) => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  // const stripHtmlEntities = str => {
  //   return String(str)
  //     .replace(/</g, '&lt;')
  //     .replace(/>/g, '&gt;')
  // }

  // const removeFile = (file) => {
  //   const newFiles = [...uploadedFiles]
  //   newFiles.splice(newFiles.indexOf(file), 1)
  //   setUploadedFiles(newFiles)
  // }

  console.log('create plant')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>new plant</strong>
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
                newPlantDispatch({
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
                  return newPlantDispatch({
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
                  newPlantDispatch({
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
                  newPlantDispatch({
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
              setUploadedFiles={newPlantSetUploadedFiles}
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
          {plantIsLoading ? (
            <div className='row justify-content-center'>
              <button
                disabled
                className='btn-success btn-lg mt-3 text-capitalize'
              >
                processing
              </button>
            </div>
          ) : (
            <React.Fragment>
              <div className='row justify-content-center'>
                <button
                  type='submit'
                  placeholder='submit'
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>add plant</strong>
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
        </div>
      </form>
      <br />
      <div>{errors && handleErrors()}</div>
    </ContainerWrapper>
  )
}
