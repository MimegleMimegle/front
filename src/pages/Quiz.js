import React from 'react'
import styled from 'styled-components'

import QuizPaper from '../components/QuizPaper'

const Quiz = (props) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', padding: '10px 0 0' }}>
          <h2 style={{ textAlign: 'center' }}>
            신세대 1교시 <br /> OOO영역
          </h2>
        </div>
        <QuizPaper />
        <div style={{ width: '100%' }}>
          <div>
            <div>progress bar</div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin-left: 0px;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Quiz
