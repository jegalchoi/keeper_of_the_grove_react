import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { plantsReducer } from './usePlants'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { PlantDropzone } from './PlantDropzone'
import { ContainerWrapper } from '../ContainerWrapper'

export const EditPlant = () => {
  const [
    { formIsLoading, userId, plantDetail },
    dispatch,
  ] = useContext(PlantContext)

  const [
    {
      plantIsLoading,
      id,
      name,
      notes,
      water,
      hidden,
      image,
      ownerId,
      errors,
    },
    editPlantDispatch,
  ] = useReducer(plantsReducer, {
    plantIsLoading: true,
    id: plantDetail.id,
    name: plantDetail.name,
    notes: plantDetail.notes,
    water: plantDetail.water,
    hidden: plantDetail.hidden,
    image: plantDetail.image,
    ownerId: plantDetail.ownerId,
    errors: null,
  })

  // useEffect(() => {
  //   console.log('fetching plant info')

  //   const urlPlantDetail = `http://localhost:3001/api/v1/plants/${id}`

  //   axios
  //     .get(urlPlantDetail, { withCredentials: true })
  //     .then((response) => {
  //       console.log(response.data)
  //       editPlantDispatch({
  //         type:
  //           response.data.status !== 400
  //             ? 'PLANT_DETAIL_FETCH_SUCCESS'
  //             : 'PLANT_DETAIL_FETCH_FAILURE',
  //         payload: response.data,
  //       })
  //     })
  //     .catch((errors) =>
  //       console.log('check plant detail api errors:', errors)
  //     )
  // }, [])

  const formatDate = (d) => {
    const date = new Date(Date.parse(d))
    const YYYY = date.getFullYear()
    const MM = `0${date.getMonth() + 1}`.slice(-2)
    const DD = `0${date.getDate()}`.slice(-2)
    return `${YYYY}-${MM}-${DD}`
  }

  const stripHtmlEntities = (str) => {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  const handleSubmit = (e) => {
    console.log('editing plant')

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
    const url = `http://localhost:3001/api/v1/users/${userId}/plants/${id}`

    axios
      .patch(url, { plant }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 'updated') {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push(`/details/${id}`)
        } else {
          dispatch({ type: 'FORM_DONE_LOADING' })
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
    const url = `http://localhost:3001/api/v1/users/${userId}/plants/${id}`
    const confirmation = confirm(
      'Are you sure you want to delete your plant?'
    )

    if (confirmation) {
      console.log('plant deletion submitted from edit plant')
      editPlantDispatch({ type: 'PLANT_DETAIL_START_LOADING' })
      axios
        .delete(url, { withCredentials: true })
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
          <div className='row form-group text-center'>
            <div className='col'>
              <DatePicker
                showTimeSelect
                selected={water}
                onChange={(date) =>
                  editPlantDispatch({
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
            // editPlantDispatch={formDispatchPlantDropzone}
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
              {userId === ownerId && (
                <React.Fragment>
                  <div className='row justify-content-center'>
                    <button
                      type='submit'
                      placeholder='submit'
                      disabled={formIsLoading}
                      className='btn-success btn-lg mt-3 text-capitalize'
                    >
                      <strong>update plant</strong>
                    </button>
                  </div>
                  <div className='row justify-content-center'>
                    <button
                      placeholder='delete'
                      disabled={formIsLoading}
                      className='btn-danger btn-lg mt-3 text-uppercase'
                      onClick={deletePlant}
                    >
                      <strong>delete plant</strong>
                    </button>
                  </div>
                </React.Fragment>
              )}
              <div className='row'>
                <div className='col text-center'>
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
