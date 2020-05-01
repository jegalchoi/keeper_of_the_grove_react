import React, { useContext } from 'react'
import { PlantCard } from './PlantCard.jsx'
import { Title } from '../Title'
import { PlantContext } from '../../context'

export const PlantList = () => {
  const [
    { plantsPublic, plantsUser, displayUserPlants },
  ] = useContext(PlantContext)
  const plants = displayUserPlants ? plantsUser : plantsPublic

  console.log('plantlist')

  return (
    <div className='py-3'>
      <div className='container'>
        <Title
          name='grove guardian'
          description='keeping your plants properly watered'
        />
        <div className='row'>
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </div>
    </div>
  )
}
