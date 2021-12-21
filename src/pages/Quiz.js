import React from 'react'
import styled from 'styled-components'

import QuizPaper from '../components/QuizPaper'

const Quiz = (props) => {
  return (
    <>
      <Wrapper>
        <div style={{ padding: '10px 0' }}>
          <h2 style={{ textAlign: 'center' }}>
            신세대 1교시 <br /> OOO영역
          </h2>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <QuizPaper />
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Quiz
