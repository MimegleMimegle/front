import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'

const QuizPaper = (props) => {
  const dispatch = useDispatch()

  const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  const quiz = quiz_list ? quiz_list[user_answer_list.length] : null

  const setAnswer = (user_answer) => {
    dispatch(quizActions.addAnswer(user_answer))
  }

  React.useEffect(() => {
    if (quiz_list === null) {
      dispatch(quizActions.getQuizListDB())
    }
    if (quiz_list && user_answer_list.length === quiz_list.length) {
      history.push('/quiz/result')
      return
    }
  }, [user_answer_list])

  if (quiz_list && user_answer_list.length === quiz_list.length) {
    return null
  }

  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', padding: '10px 0' }}>
          <h4 style={{ fontSize: '13px', textAlign: 'left' }}>
            <span>{user_answer_list.length + 1}</span>/10
          </h4>
          <div style={{ height: '56px', fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>{quiz_list ? quiz.question : null}</div>
        </div>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button
            className="answer-btn"
            onClick={() => {
              setAnswer(quiz_list ? quiz.choice[0] : null)
            }}
          >
            {quiz_list ? quiz.choice[0] : null}
          </button>
          <button
            className="answer-btn"
            onClick={() => {
              setAnswer(quiz_list ? quiz.choice[1] : null)
            }}
          >
            {quiz_list ? quiz.choice[1] : null}
          </button>
          <button
            className="answer-btn"
            onClick={() => {
              setAnswer(quiz_list ? quiz.choice[2] : null)
            }}
          >
            {quiz_list ? quiz.choice[2] : null}
          </button>
          <button
            className="answer-btn"
            onClick={() => {
              setAnswer(quiz_list ? quiz.choice[3] : null)
            }}
          >
            {quiz_list ? quiz.choice[3] : null}
          </button>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  max-width: 325px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 5px solid #333; */
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 360px;
  transition: all 0.1s ease-in-out;
  &::after {
  }

  .answer-btn {
    font-size: 16px;
    color: #ffffff;
    background-color: rgb(115, 98, 255);
    border-radius: 5px;
    height: 50px;
    padding: 4px;
    margin: 4px;
    width: 100%;
    font-weight: 700;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: rgb(152, 141, 253);
    }
  }
`

export default QuizPaper
