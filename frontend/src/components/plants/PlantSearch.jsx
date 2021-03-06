import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTree } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

export const PlantSearch = (props) => {
  const { setQuery, query, loading } = props

  return (
    <PlantSearchWrapper>
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
            alt='search-icon'
          />
        </label>
        {!loading ? null : (
          <FontAwesomeIcon
            icon={faTree}
            size='4x'
            className='search-loading'
            alt='loading-icon'
          />
        )}
      </div>
    </PlantSearchWrapper>
  )
}

const PlantSearchWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
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
  .search-loading {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    color: #444;
  }
`
