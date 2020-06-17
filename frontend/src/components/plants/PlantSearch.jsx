import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

export const PlantSearch = (props) => {
  const { setQuery, query } = props

  return (
    <ContainerWrapper>
      <div className='container'>
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
      </div>
    </ContainerWrapper>
  )
}

const ContainerWrapper = styled.div`
  .container {
    width: 100%;
    text-align: center;
  }
  .search-label {
    position: relative;
  }
  .container input {
    width: 100%;
    padding: 16px;
    font-size: 20px;
    font-style: italic;
    color: #444;
    box-sizing: border-box;
    outline: none;
  }
  .search-icon {
    position: absolute;
    top: 25px;
    right: 18px;
    color: #555;
  }
`
