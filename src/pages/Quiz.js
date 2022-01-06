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
  margin-left: 0px;
  padding: 0 16px;
  width: 100%;
  max-height: 620px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Quiz
