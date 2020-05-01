import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { plantsReducer } from './usePlants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PlantDropzone } from './PlantDropzone'
import { ContainerWrapper } from '../ContainerWrapper'

// import PlantImages from './PlantImages'
// import PlantImagesButtons from './PlantImagesButtons'
// import Spinner from '../Spinner'

export const NewPlant = () => {
  const [{ userId, formIsLoading }, dispatch] = useContext(
    PlantContext
  )

  const [
    { name, notes, water, hidden, image, errors, images, uploading },
    newPlantDispatch,
  ] = useReducer(plantsReducer, {
    name: '',
    notes: '',
    water: '',
    hidden: true,
    image: '',
    errors: null,
    uploading: false,
    images: [],
  })

  //

  const handleSubmit = (e) => {
    console.log('creating plant')

    dispatch({ type: 'FORM_START_LOADING' })

    let plant = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: water === '' ? null : water,
      hidden,
      image:
        image === '' ? 'https://placeimg.com/320/240/nature' : image,
      user_id: userId,
    }
    const url = 'http://localhost:3001/api/v1/plants'

    if (name.length === 0 || userId === 0) return

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
          dispatch({ type: 'FORM_DONE_LOADING' })
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

  const plantImages = () => {
    switch (true) {
      case uploading:
        return <Spinner />
      case images.length > 0:
        return (
          <PlantImages images={images} removeImage={removeImage} />
        )
      default:
        return <PlantImagesButtons onChange={onChange} />
    }
  }

  // const stripHtmlEntities = str => {
  //   return String(str)
  //     .replace(/</g, '&lt;')
  //     .replace(/>/g, '&gt;')
  // }

  const formDispatchPlantDropzone = (url) => {
    newPlantDispatch({
      type: 'field',
      fieldName: 'image',
      payload: url,
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
          <div className='row form-group text-center'>
            <div className='col'>
              <DatePicker
                showTimeSelect
                selected={water}
                onChange={(date) =>
                  newPlantDispatch({
                    type: 'field',
                    fieldName: 'water',
                    payload: date,
                  })
                }
              />
              <small id='waterHelp' className='form-text text-muted'>
                Select date that plant was last watered.
              </small>
            </div>
          </div>
          <div className='row form-group text-center'>
            <div className='col'>
              <input
                type='text'
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
              newPlantDispatch={formDispatchPlantDropzone}
            />
          </div>
          {formIsLoading ? (
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
                  disabled={formIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>add plant</strong>
                </button>
              </div>
              <div className='row justify-content-center'>
                <Link to='/'>
                  <button
                    placeholder='home'
                    disabled={formIsLoading}
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
