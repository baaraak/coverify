import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { useDebounce } from 'use-debounce'
import axios from 'axios'

import Snuggle from '../_third-library/react-snuggle'
import { Image, Search, Copyright } from './style'
import { getDataFromSplash } from '../actions'
import { wordList, appName } from '../content'
import ImagesLoading from './Loading'
import EmptyState from './EmptyState'

const Backgrounds = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState()
  const images = useSelector(state => state.images)
  const loading = useSelector(state => state.loadings.gallery)
  const struggleRef = useRef()
  const [searchDebounce] = useDebounce(search, 600)
  const data = images[searchDebounce] || []

  const handleImage = async image => {
    dispatch({
      type: 'UPDATE_STAGE',
      meta: 'imageStage',
      payload: image.urls.full,
    })

    await axios.get(`.netlify/functions/download`, {
      params: { id: image.id },
    })
  }

  const randomWord = () => {
    const randomElement = wordList[Math.floor(Math.random() * wordList.length)]

    setSearch(randomElement)
  }

  useEffect(() => {
    randomWord()
  }, [])

  useEffect(() => {
    if (!images[searchDebounce]) {
      getDataFromSplash(searchDebounce, dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchDebounce])

  return (
    <>
      <Search
        value={search}
        placeholder="Search for something here..."
        onChange={({ target: { value } }) => setSearch(value)}
      />

      {!loading && data.length === 0 && <EmptyState randomWord={randomWord} />}

      {loading ? (
        <ImagesLoading />
      ) : (
        <Snuggle ref={struggleRef}>
          {data.map(element => (
            <motion.button
              key={element.id}
              onClick={() => handleImage(element)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                onLoad={struggleRef.current.resize}
                src={element.urls.regular}
                alt={element.alt_description}
              />

              <Copyright>
                Photo by{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${element.user.links.html}?utm_source=${appName}&utm_medium=referral`}
                >
                  {element.user.name}
                </a>{' '}
                on{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://unsplash.com/?utm_source=${appName}&utm_medium=referral`}
                >
                  Unsplash
                </a>
              </Copyright>
            </motion.button>
          ))}
        </Snuggle>
      )}
    </>
  )
}

export default Backgrounds
