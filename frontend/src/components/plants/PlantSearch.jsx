import React from 'react'
import { ContainerWrapper } from '../ContainerWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const PlantSearch = (props) => {
  const { setQuery, query } = props

  return (
    <div>
      <ContainerWrapper>
        <label className='search-label'>
          <input
            placeholder='Search...'
            type='text'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            className='search-input'
          />
          <FontAwesomeIcon
            icon={faSearch}
            size='1x'
            className='search-icon'
          />
        </label>
      </ContainerWrapper>
    </div>
  )
}
