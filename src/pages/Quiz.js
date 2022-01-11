import React from 'react'
import styled from 'styled-components'

import QuizPaper from '../components/QuizPaper'

const Quiz = (props) => {
  return (
    <>
      <Wrapper>
        <QuizPaper />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 0 16px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Quiz
