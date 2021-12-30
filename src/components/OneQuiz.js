import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const OneQuiz = ({ quiz, index }) => {
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  return (
    <>
      <div>
        <div style={{ display: 'flex' }}>
          <span>Q.{index + 1}</span>
          <h4>{quiz.question}</h4>
        </div>
        <AnswerSection>
          <p className={`${quiz.solution === quiz.choice[0] ? 'solution' : ''} ${user_answer_list[index] === quiz.choice[0] ? 'user-answer' : ''}`}>1. {quiz.choice[0]}</p>
          <p className={`${quiz.solution === quiz.choice[1] ? 'solution' : ''} ${user_answer_list[index] === quiz.choice[1] ? 'user-answer' : ''}`}>2. {quiz.choice[1]}</p>
          <p className={`${quiz.solution === quiz.choice[2] ? 'solution' : ''} ${user_answer_list[index] === quiz.choice[2] ? 'user-answer' : ''}`}>3. {quiz.choice[2]}</p>
          <p className={`${quiz.solution === quiz.choice[3] ? 'solution' : ''} ${user_answer_list[index] === quiz.choice[3] ? 'user-answer' : ''}`}>4. {quiz.choice[3]}</p>
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
