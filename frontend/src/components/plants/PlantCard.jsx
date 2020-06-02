import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { GroveContext } from '../../context'
import { plantsReducer } from './usePlants'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

export const PlantCard = ({ plant }) => {
  const { id, name, notes, water, hidden, image, user_id } = plant
  const ownerId = user_id

  const [{ userId }, dispatch] = useContext(GroveContext)

  const [{ plantIsLoading }, plantDispatch] = useReducer(
    plantsReducer,
    {
      plantIsLoading: false,
    }
  )

  const waterPlant = () => {
    console.log('watering plant')

    plantDispatch({ type: 'PLANT_DETAIL_START_LOADING' })

    const plant = {
      water: new Date(),
    }
    // const urlPlantPatch = `http://localhost:3001/api/v1/users/${user_id}/plants/${id}`
    const urlPlantPatch = `/api/v1/users/${user_id}/plants/${id}`
    axios
      .patch(urlPlantPatch, { plant }, { withCredentials: true })
      .then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          dispatch({
            type: 'PLANT_NEED_REFRESH',
          })
          history.push('/')
          plantDispatch({ type: 'PLANT_DETAIL_DONE_LOADING' })
        }
      })
      .catch((error) =>
        console.log('PlantCard/waterPlant api errors:', error)
      )
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
    <PlantWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3 text-center'>
      <div className='card'>
        <div className='img-container'>
          <Link to={`/details/${id}`}>
            <img
              src={image}
              alt={name}
              className='card-img-top rounded pt-5'
            />
          </Link>
          {userId === ownerId &&
            (plantIsLoading ? (
              <button className='water-btn' disabled>
                <span className='badge badge-info text-capitalize'>
                  processing
                </span>
              </button>
            ) : (
              <button
                className='water-btn'
                disabled={water == null ? false : compareDates(water)}
                onClick={() => waterPlant()}
              >
                {water == null || !compareDates(water) ? (
                  <span className='badge badge-success'>
                    water plant
                  </span>
                ) : (
                  <span className='badge badge-secondary disabled'>
                    watered today
                  </span>
                )}
              </button>
            ))}
        </div>
        <div className='card-footer container'>
          <div className='row justify-content-center'>
            <p className='mb-0 d-inline-block text-truncate'>
              <Link to={`/details/${id}`}>
                <strong>{name}</strong>
              </Link>
            </p>
          </div>
          {userId !== ownerId ? (
            <br />
          ) : (
            <div className='row justify-content-center text-muted'>
              {water !== null ? (
                <p className='mb-0 d-inline-block text-truncate'>
                  watered <TimeAgo date={water} />
                </p>
              ) : (
                <p className='mb-0'>never been watered</p>
              )}
            </div>
          )}
        </div>
      </div>
    </PlantWrapper>
  )
}

const PlantWrapper = styled.div`
  .card {
    border-color: green;
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
    height: 15rem;
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    height: auto;
    max-height: 12rem;
    width: auto;
    max-width: 12rem;
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
    border: none;
    font-size: 1.1rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.5s linear;
  }
  .img-container:hover .water-btn {
    transform: translate(0, 0);
  }
  .water-btn:hover {
    cursor: pointer;
  }
`
