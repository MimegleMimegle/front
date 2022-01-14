import React from 'react'
import styled from 'styled-components'

const OneQuiz = ({ quiz, index }) => {
  return (
    <>
      <OneQuizBox>
        <div className="quiz-number">{index + 1}</div>
        <div className="quiz">
          <div className="quiz-question">{quiz.question}</div>
          <p className="quiz-solution">정답: {quiz.solution}</p>
        </div>
      </OneQuizBox>
    </>
  )
}

const OneQuizBox = styled.div`
  width: 100%;
  padding: 12px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: left;
  .quiz-number {
    width: 30px;
    height: 30px;
    border: 2px solid #111;
    background-color: ${({ theme }) => theme.colors.yellow};
    border-radius: 20px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 500;
    text-align: center;
    line-height: 28px;
  }
  .quiz {
    width: auto;
    padding: 0 0 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    .quiz-question {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: 500;
    }
    .quiz-solution {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`

export default OneQuiz
