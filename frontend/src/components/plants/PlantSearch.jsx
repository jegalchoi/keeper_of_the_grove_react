import React, { useContext, useReducer, useState } from 'react'
import axios from 'axios'
import { GroveContext } from '../../context'
import { plantsReducer } from './usePlants'
import { ContainerWrapper } from '../ContainerWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const PlantSearch = () => {
  const [
    { plantsPublic, plantsUser, displayUserPlants },
  ] = useContext(GroveContext)
  const plants = displayUserPlants ? plantsUser : plantsPublic

  const [query, setQuery] = useState([])

  return (
    <div>
      <ContainerWrapper>
        <label className={'search-label'}>
          <input
            type='text'
            value={query}
            id='search-input'
            placeholder='Search...'
          />
          <FontAwesomeIcon icon={faSearch} size='1x' />
        </label>
      </ContainerWrapper>
    </div>
  )
}
