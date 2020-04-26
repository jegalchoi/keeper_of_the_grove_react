import React, { useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory, useParams } from 'react-router-dom'
import { PlantContext } from '../../context'
import { formReducer } from '../useForm'
// import { ButtonContainer } from './Button'
import TimeAgo from 'react-timeago'

export const PlantDetail = () => {
  const [{ userId }, dispatch] = useContext(PlantContext)

  let { plantId } = useParams()

  const [
    {
      plantIsLoading,
      name,
      notes,
      water,
      hidden,
      image,
      ownerId,
      errors,
    },
    plantDispatch,
  ] = useReducer(formReducer, {
    plantIsLoading: true,
    name: '',
    notes: '',
    water: '',
    hidden: '',
    image: '',
    ownerId: '',
    errors: null,
  })

  useEffect(() => {
    console.log('fetching plant detail')

    const urlPlantDetail = `http://localhost:3001/api/v1/plants/${plantId}`

    axios
      .get(urlPlantDetail, { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        plantDispatch({
          type:
            response.data.status !== 400
              ? 'PLANT_DETAIL_FETCH_SUCCESS'
              : 'PLANT_DETAIL_FETCH_FAILURE',
          payload: response.data,
        })
      })
      .catch((errors) =>
        console.log('check login api errors:', errors)
      )
  }, [])

  const deletePlant = () => {
    const url = `http://localhost:3001/api/v1/users/${userId}/plants/${plantId}`
    const confirmation = confirm(
      'Are you sure you want to delete this plant?'
    )

    if (confirmation) {
      console.log('deleting plant')
      plantDispatch({ type: 'PLANT_DETAIL_START_LOADING' })
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
          console.log('delete user api errors:', error)
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

  // formatDate = d => {
  //   console.log(d)
  //   const date = new Date(Date.parse(d))
  //   const YYYY = date.getFullYear()
  //   const MM = `0${date.getMonth() + 1}`.slice(-2)
  //   const DD = `0${date.getDate()}`.slice(-2)
  //   console.log(`${YYYY}-${MM}-${DD}`)
  //   return `${YYYY}-${MM}-${DD}`
  // }

  console.log('plant detail')

  return (
    <React.Fragment>
      {errors ? null : (
        <div className='container py-5'>
          {/* {title} */}
          <div className='row'>
            <div className='col-10 mx-auto text-center my-5'>
              <h1>{name}</h1>
            </div>
          </div>
          {/* {plant info} */}
          <div className='row'>
            <div className='col-10 mx-auto col-md-6 my-3'>
              <img src={image} alt={name} className='img-fluid' />
            </div>
            <div className='col-10 mx-auto col-md-6 my-3 text-center'>
              {userId === ownerId &&
                (water !== null ? (
                  <div>
                    <h4 className='mb-2'>
                      <strong>
                        watered <TimeAgo date={water} />
                      </strong>
                    </h4>
                  </div>
                ) : (
                  <h4 className='mb-2'>
                    <strong>never been watered</strong>
                  </h4>
                ))}
              {userId === ownerId && (
                <p className='font-weight-bold mt-3 mb-0 text-capitalize'>
                  notes:
                </p>
              )}
              {userId === ownerId && (
                <p className='text-muted mt-3 mb-2 text-capitalize'>
                  <strong>{hidden ? 'private' : 'public'}</strong>
                </p>
              )}
              <p className='text-muted lead'>{notes}</p>
              {/* {buttons} */}
              {plantIsLoading ? (
                <button
                  disabled={plantIsLoading}
                  className='btn-success btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
                >
                  processing
                </button>
              ) : (
                <React.Fragment>
                  {userId === ownerId && (
                    <React.Fragment>
                      <Link to='/edit'>
                        <button
                          placeholder='edit'
                          disabled={plantIsLoading}
                          className='btn-success btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
                        >
                          <strong>edit plant</strong>
                        </button>
                      </Link>
                      <button
                        placeholder='delete'
                        disabled={plantIsLoading}
                        className='btn-danger btn-lg mt-3 text-uppercase position-relative mx-auto d-block'
                        onClick={deletePlant}
                      >
                        <strong>delete plant</strong>
                      </button>
                    </React.Fragment>
                  )}
                  <Link to='/'>
                    <button
                      placeholder='home'
                      disabled={plantIsLoading}
                      className='btn-primary btn-lg mt-3 text-capitalize position-relative mx-auto d-block'
                    >
                      <strong>home</strong>
                    </button>
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
      <div>{errors && handleErrors()}</div>
    </React.Fragment>
  )
}
