import React, { useState, useEffect, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import searchSrc from '../assets/search.svg'
import { useGetBackgroundSearch, dispatchSearch } from '../config/actions'
import { selectors } from '../config/reducer'
import { useDebounce } from 'common/utils'

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

const Search: React.FC = ({ ...props }) => {
  // UI States
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debounceSearch = useDebounce(searchValue, 1000)

  const searchQueryFromStorage = useSelector(selectors.getSearchQuery)

  // Handles
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: Why events are so hard to handle?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSearchValue((event.target as any).value)
  }

  // Dispatch data to reducer debounce
  useEffect(() => {
    dispatch(dispatchSearch(debounceSearch))
  }, [debounceSearch, dispatch])

  // Make sure that UI is updated with storage
  useEffect(() => {
    setSearchValue(searchQueryFromStorage)
  }, [searchQueryFromStorage])

  useGetBackgroundSearch()

  return (
    <SearchBar
      value={searchValue}
      placeholder="Search for something here..."
      onChange={handleSearch}
      {...props}
    />
  )
}

export { Search }
