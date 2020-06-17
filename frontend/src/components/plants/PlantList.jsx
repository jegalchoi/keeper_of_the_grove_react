import React, {
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { GroveContext } from '../../context'
import { plantsReducer } from './usePlants'
import { Title } from '../Title'
import { PlantSearch } from './PlantSearch'
import { PlantCard } from './PlantCard.jsx'

export const PlantList = () => {
  const [
    { plantsPublic, plantsUser, displayUserPlants },
  ] = useContext(GroveContext)
  const plants = displayUserPlants ? plantsUser : plantsPublic

  const [filteredPlants, setFilteredPlants] = useState(plants)

  const [
    { query, loading, errors },
    plantSearchDispatch,
  ] = useReducer(plantsReducer, {
    query: '',
    loading: false,
    errors: null,
  })

  useEffect(() => {
    if (query !== '') {
      // startLoading()
      setFilteredPlants(filterPlants(plants, query))
    } else {
      setFilteredPlants(plants)
    }
  }, [query])

  const filterPlants = (plants, query) => {
    return plants.filter((plant) => {
      return plant.name.toLowerCase().includes(query.toLowerCase())
    })
    // finishLoading()
  }

  const plantListSetQuery = (payload) => {
    plantSearchDispatch({
      type: 'field',
      fieldName: 'query',
      payload,
    })
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
        <PlantSearch setQuery={plantListSetQuery} query={query} />
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
