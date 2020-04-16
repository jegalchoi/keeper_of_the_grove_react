import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from '../useForm'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const NewPlant = () => {
  const [state, dispatch] = useContext(PlantContext)

  const { userId, formIsLoading } = state

  const [formState, formDispatch] = useReducer(formReducer, {
    name: '',
    notes: '',
    water: '',
    hidden: true,
    image: '',
    errors: null,
  })

  const { name, notes, water, hidden, image, errors } = formState

  const handleSubmit = e => {
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

    if (name.length === 0 || userId === 0) return

    const url = 'http://localhost:3001/api/v1/plants'

    axios
      .post(url, { plant }, { withCredentials: true })
      .then(response => {
        console.log(response.data)
        if (response.data.status === 'created') {
          dispatch({
            type: 'PLANT_NEW_TOGGLE',
          })
          history.push(`/`)
          // history.push(`/details/${response.data.plant.id}`)
        } else {
          dispatch({ type: 'FORM_DONE_LOADING' })
          formDispatch({
            type: 'PLANT_CREATE_FAILURE',
            payload: response.data,
          })
        }
      })
      .catch(error => console.log('create plant api errors:', error))

    e.target.reset()
    e.preventDefault()
  }

  const history = useHistory()

  const handleErrors = () => {
    console.log('rendering errors')
    return (
      <div className='text-center'>
        <ul className='p-0'>
          {errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  const dateInput = React.createRef()

  const formatDate = d => {
    console.log(d)
    const YYYY = d.getFullYear()
    const MM = `0${d.getMonth() + 1}`.slice(-2)
    const DD = `0${d.getDate()}`.slice(-2)
    return `${YYYY}-${MM}-${DD}`
  }

  const stripHtmlEntities = str => {
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  console.log('create plant')

  return (
    <React.Fragment>
      <div className='d-flex justify-content-center'>
        <div>
          <h1 className='text-capitalize'>
            <strong>add new plant</strong>
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'name',
                  payload: e.target.value,
                })
              }
              required
            />
            <br />
            <br />

            <br />
            <br />
            {/* <input
              type=''
              placeholder='Password'
              value={password}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.target.value,
                })
              }
              required
            /> */}
            <br />
            <br />
            <input
              type='text'
              placeholder='Notes'
              value={notes}
              onChange={e =>
                formDispatch({
                  type: 'field',
                  fieldName: 'notes',
                  payload: e.target.value,
                })
              }
            />
            <small id='notesHelp' className='form-text text-muted'>
              Separate each note with a comma.
            </small>
            <br />
            <br />
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                checked={hidden}
                id='plantHidden'
                onChange={e =>
                  formDispatch({
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
                <strong>private</strong>
              </label>
            </div>
            <br />
            {formIsLoading ? (
              <button
                disabled={formIsLoading}
                className='btn-success btn-lg mt-3 text-capitalize'
              >
                processing
              </button>
            ) : (
              <React.Fragment>
                <button
                  type='submit'
                  placeholder='submit'
                  disabled={formIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize'
                >
                  <strong>create plant</strong>
                </button>
                <br />
                <Link to='/'>
                  <button
                    placeholder='home'
                    disabled={formIsLoading}
                    className='btn-primary btn-lg mt-3 text-capitalize'
                    onClick={() => dispatch({ type: 'CLEAR_ERRORS' })}
                  >
                    <strong>home</strong>
                  </button>
                </Link>
              </React.Fragment>
            )}
          </form>
          <br />
        </div>
      </div>
      <div>{errors && handleErrors()}</div>
    </React.Fragment>
  )
}
