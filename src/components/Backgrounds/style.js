import styled from 'styled-components'

import searchSrc from '../../assets/search.svg'

export const Search = styled.input`
  background: url(${searchSrc}) 10px center no-repeat;
  background-size: 14px;
  transition: all 0.2s ease;

  padding: 10px 10px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 20px;
  padding-left: 36px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    background-color: #3c3c3c;
  }
`

export const Image = styled.img`
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  border-radius: 2px;
  width: 100%;
`

export const Copyright = styled.p`
  font-size: 12px;
  text-align: left;
  margin-top: 10px;
  opacity: 0.6;

  a {
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`
