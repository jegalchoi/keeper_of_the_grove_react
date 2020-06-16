import React, { useContext, useState, useReducer } from 'react'
import { GroveContext } from '../../context'
import { plantsReducer } from './usePlants'
import { Title } from '../Title'
import { PlantSearch } from './PlantSearch'
import { PlantCard } from './PlantCard.jsx'

export const PlantList = () => {
  // const [
  //   { plantsPublic, plantsUser, displayUserPlants },
  // ] = useContext(GroveContext)
  // const plants = displayUserPlants ? plantsUser : plantsPublic
  const [filteredPlants, setFilteredPlants] = useState([])

  const [{ loading, errors }, plantSearchDispatch] = useReducer(
    plantsReducer,
    {
      loading: false,
      errors: null,
    }
  )

  const plantListSetFilteredPlants = (plants) => {
    setFilteredPlants([...filteredPlants, ...plants])
  }

  const handleErrors = () => {
    // console.log('rendering errors')
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

  // console.log('plantlist')

  return (
    <div className='py-3'>
      <div className='container'>
        <Title
          name='grove guardian'
          description='keeping your plants properly watered'
        />
        <PlantSearch
          setFilteredPlants={plantListSetFilteredPlants}
          filteredPlants={filteredPlants}
          startLoading={plantSearchDispatch({
            type: 'PLANT_START_LOADING',
          })}
          finishLoading={plantSearchDispatch({
            type: 'PLANT_FINISH_LOADING',
          })}
          loading={loading}
        />
        <div className='row'>
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>
      <div>{errors && handleErrors()}</div>
    </div>
  )
}
