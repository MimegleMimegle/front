import React from 'react'
import styled from 'styled-components'

const OneQuiz = ({ quiz, index }) => {
  return (
    <>
      <div style={{ padding: '10px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <QuizNumber>{index + 1}</QuizNumber>
          <QuizQuestion>{quiz.question}</QuizQuestion>
        </div>
        <QuizSolution>정답: {quiz.solution}</QuizSolution>
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
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
  text-align: center;
  line-height: 30px;
`

const QuizQuestion = styled.p`
  padding: 0 0 0 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
`

const QuizSolution = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  margin: 5px 0 0 40px;
`

export default OneQuiz
