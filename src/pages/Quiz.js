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
  padding: 0 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Quiz
