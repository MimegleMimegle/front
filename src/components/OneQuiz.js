import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const OneQuiz = ({ quiz, index }) => {
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  return (
    <>
      <div style={{ padding: '10px 0' }}>
        <h4>
          Q.{index + 1}
          {quiz.question}
        </h4>
        <AnswerSection>
          <p className={`${quiz.solution === quiz.choice[0] ? 'solution' : ''}`}>(1) {quiz.choice[0]}</p>
          <p className={`${quiz.solution === quiz.choice[1] ? 'solution' : ''}`}>(2) {quiz.choice[1]}</p>
          <p className={`${quiz.solution === quiz.choice[2] ? 'solution' : ''}`}>(3) {quiz.choice[2]}</p>
          <p className={`${quiz.solution === quiz.choice[3] ? 'solution' : ''}`}>(4) {quiz.choice[3]}</p>
        </AnswerSection>
      </div>
    </>
  )
}

const AnswerSection = styled.div`
  .solution {
    color: #00a0ff;
    font-weight: 700;
  }
  .user-answer {
    color: #ff8e00;
    font-weight: 700;
  }
`

export default OneQuiz
