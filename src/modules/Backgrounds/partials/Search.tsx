import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

import searchSrc from '../assets/search.svg'

const SearchBar = styled.input`
  background: url(${searchSrc}) 10px center no-repeat;
  background-size: var(--size-normal);

  padding: 0.6em;
  margin-bottom: 1.2em;
  padding-left: 2.25em;
  width: 100%;

  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: 0.6;

  color: var(--color-white);

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    background-color: var(--color-white-lighter);
  }
`

const Search: React.FC = () => {
  // UI States
  const [search, setSearch] = useState('')

  // Handles
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <SearchBar
      value={search}
      placeholder="Search for something here..."
      onChange={handleSearch}
    />
  )
}

export { Search }
