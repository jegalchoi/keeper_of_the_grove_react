import React, { useContext, useReducer, useState } from 'react'
import axios from 'axios'
import { GroveContext } from '../../context'
import { plantsReducer } from './usePlants'
import { ContainerWrapper } from '../ContainerWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const PlantSearch = (props) => {
  const [
    { plantsPublic, plantsUser, displayUserPlants },
  ] = useContext(GroveContext)
  const plants = displayUserPlants ? plantsUser : plantsPublic
  const {
    setFilteredPlants,
    filteredPlants,
    startLoading,
    finishLoading,
    loading,
  } = props

  const [query, setQuery] = useState([])

  return (
    <div>
      <ContainerWrapper>
        <label className={'search-label'}>
          <input
            placeholder='Search...'
            type='text'
            value={query}
            onChange={(e) => {
              startLoading()
              setQuery(e.target.value)
            }}
            id='search-input'
          />
          <FontAwesomeIcon icon={faSearch} size='1x' />
        </label>
      </ContainerWrapper>
    </div>
  )
}
