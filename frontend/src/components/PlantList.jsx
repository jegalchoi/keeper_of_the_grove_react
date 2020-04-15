import React, { useContext } from 'react'
import { Plant } from './Plant.jsx'
import { Title } from './Title'
import { PlantContext } from '../context'

export const PlantList = () => {
  console.log('plantlist')

  const [state, dispatch] = useContext(PlantContext)

  const { plants } = state

  console.log(plants)

  return (
    <React.Fragment>
      <div className='py-5'>
        <div className='container'>
          <Title
            name='grove guardian'
            description='keeping your plants properly watered'
          />
          <div className='row'>
            {plants.map(plant => (
              <Plant key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
