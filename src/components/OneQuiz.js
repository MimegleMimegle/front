import React from 'react'
import styled from 'styled-components'

const OneQuiz = ({ quiz, index }) => {
  return (
    <>
      <OneQuizBox>
        <div className="quiz-number">{index + 1}</div>
        <div className="quiz">
          <p className="quiz-question">{quiz.question}</p>
          <p className="quiz-solution">정답: {quiz.solution}</p>
        </div>
      </OneQuizBox>
    </>
  )
}

const OneQuizBox = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: flex-start;
  justify-content: left;
  .quiz-number {
    width: 30px;
    height: 30px;
    border: 1px solid #111;
    background-color: #ffe95e;
    border-radius: 20px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 500;
    text-align: center;
    line-height: 30px;
  }
  .quiz {
    width: 100%;
    padding: 0 0 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    .quiz-quiestion {
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
    .quiz-solution {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`

export default OneQuiz
