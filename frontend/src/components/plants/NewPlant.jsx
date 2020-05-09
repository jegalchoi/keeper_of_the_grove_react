import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { plantsReducer } from './usePlants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PlantDropzone } from './PlantDropzone'
import { ContainerWrapper } from '../ContainerWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// import PlantImages from './PlantImages'
// import PlantImagesButtons from './PlantImagesButtons'
// import Spinner from '../Spinner'

export const NewPlant = () => {
  const [{ userId }, dispatch] = useContext(PlantContext)

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
      uploading,
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
    uploading: false,
  })

  //

  const handleSubmit = (e) => {
    console.log('creating plant')

    newPlantDispatch({ type: 'PLANT_START_LOADING' })

    let plant = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: water === '' ? null : water,
      hidden,
      image:
        imageUrl === ''
          ? 'https://placeimg.com/320/240/nature'
          : imageUrl,
      image_id: imageId,
      user_id: userId,
    }
    const url = 'http://localhost:3001/api/v1/plants'

    axios
      .post(url, { plant }, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        if (response.data.status === 'created') {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push(`/details/${response.data.plant.id}`)
        } else {
          newPlantDispatch({
            type: 'PLANT_CREATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch((error) =>
        console.log('create plant api errors:', error)
      )

    e.target.reset()
    e.preventDefault()
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

  const newPlantDispatchPlantDropzone = (state, value) => {
    newPlantDispatch({
      type: 'PLANT_SET_IMAGE_STATE',
      stateName: state,
      payload: value,
    })
  }

  const newPlantDispatchClearImages = () => {
    newPlantDispatch({
      type: 'PLANT_CLEAR_IMAGES',
    })
  }

  console.log('create plant')

  return (
    <ContainerWrapper>
      <h1 className='text-capitalize text-center'>
        <strong>add new plant</strong>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row justify-content-center form-group'>
            <input
              type='text'
              placeholder='Name'
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
          <div className='row'>
            <PlantDropzone
              userId={userId}
              imageId={imageId}
              imagePublicId={imagePublicId}
              newPlantDispatch={newPlantDispatchPlantDropzone}
              newPlantDispatchClearImages={
                newPlantDispatchClearImages
              }
            />
            {/* <button
              className='btn btn-outline-danger mr-2'
              onClick={() => deleteImage()}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                size='1x'
                color='black'
                id='trash'
              />
            </button> */}
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
                  disabled={plantIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>add plant</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/'>
                  <button
                    placeholder='home'
                    disabled={plantIsLoading}
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
