import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PlantContext } from '../../context'
import { formReducer } from '../useForm'

export const Plant = ({ plant }) => {
  const { id, name, notes, water, hidden, image, user_id } = plant

  const [state, dispatch] = useContext(PlantContext)

  const [plantState, plantDispatch] = useReducer(formReducer, {
    plantIsLoading: false,
  })
  const { plantIsLoading } = plantState

  const handleWaterPlant = () => {
    console.log('plant watered')

    plantDispatch({ type: 'PLANT_DETAIL_START_LOADING' })

    const plant = {
      water: new Date(),
    }
    const url = `http://localhost:3001/api/v1/users/${user_id}/plants/${id}`

    axios
      .patch(url, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.status)
        if (response.status === 200) {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          plantDispatch({ type: 'PLANT_DETAIL_DONE_LOADING' })
          history.push('/')
        }
      })
      .catch((error) => console.log('water plant api errors:', error))
  }

  const history = useHistory()

  const formatDate = (d) => {
    const date = new Date(Date.parse(d))
    const YYYY = date.getFullYear()
    const MM = `0${date.getMonth() + 1}`.slice(-2)
    const DD = `0${date.getDate()}`.slice(-2)
    return `${YYYY}-${MM}-${DD}`
  }

  const compareDates = (date) => {
    const today = new Date()
    const todayFormatted = formatDate(today)
    return todayFormatted === formatDate(date)
  }

  return (
    <PlantWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
      <div className='card'>
        <div className='img-container p-5'>
          <Link to={`/details/${id}`}>
            <img src={image} alt={name} className='card-img-top' />
          </Link>
          {plantIsLoading ? (
            <button className='water-btn' disabled>
              <span className='badge badge-info text-capitalize'>
                processing
              </span>
            </button>
          ) : (
            <button
              className='water-btn'
              disabled={water == null ? false : compareDates(water)}
              onClick={() => handleWaterPlant()}
            >
              {water == null || !compareDates(water) ? (
                <span className='badge badge-info'>water plant</span>
              ) : (
                <span className='badge badge-success disabled'>
                  watered today
                </span>
              )}
            </button>
          )}
        </div>
        <div className='card-footer d-flex justify-content-between'>
          <p className='align-self-center mb-0'>{name}</p>
          {/* <h5 className='font-italic mb-0'>
            notes will go here
          </h5> */}
        </div>
      </div>
    </PlantWrapper>
  )
}
const PlantWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 0.5s linear;
  }
  .card-footer {
    background: transparent:
    border-top: transparent;
    transition: all 0.5s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0,0,0,0.2);
      box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 0.5s linear;
  }
  .img-container:hover  .card-img-top {
    transform: scale(1.2);
  }
  .water-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: bg-info;
    border: none;
    color: bg-primary;
    font-size: 1.1rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.5s linear;
  }
  .img-container:hover .water-btn {
    transform: translate(0, 0);
  }
  .water-btn:hover {
    color: bg-primary;
    cursor: pointer;
  }
`
