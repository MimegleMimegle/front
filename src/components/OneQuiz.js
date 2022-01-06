import React from 'react'
import styled from 'styled-components'

const OneQuiz = ({ quiz, index }) => {
  return (
    <>
      <div style={{ padding: '10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <QuizNumber>{index + 1}</QuizNumber>
          <p style={{ paddingLeft: '10px', fontSize: '14px' }}>{quiz.question}</p>
        </div>
        <p style={{ fontSize: '12px', margin: '5px 0 0 40px' }}>정답: {quiz.solution}</p>
      </div>
    </>
  )
}

const QuizNumber = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #111;
  background-color: #ffe95e;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
`

export default OneQuiz
