import React from 'react'
import styled from 'styled-components'

const HashTag = (props) => {
  return (
    <>
      <HashTagText>{props.hashtag}</HashTagText>
    </>
  )
}

const HashTagText = styled.span`
  font-size: 14px;
  background-color: #fff8b6;
  margin-right: 5px;
  padding: 5px;
  border-radius: 10px;
`

export default HashTag
