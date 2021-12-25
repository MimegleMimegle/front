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
        <QuizTitle>
          <div className="question-number-box box-1">Q. 01</div>
          <div className="question-number-box box-2"></div>
          <h2 className="title">Q1. Quiz Title Section</h2>
        </QuizTitle>
        <QuizBox>
          <div>
            <button className="answer-btn">answer 1</button>
          </div>
          <div>
            <button className="answer-btn">answer 2</button>
          </div>
          <div>
            <button className="answer-btn">answer 3</button>
          </div>
          <div>
            <button className="answer-btn btn-4">answer 4</button>
          </div>
          <div className="next-btn-box box-1">
            <button className="next-btn">다음</button>
          </div>
          <div className="next-btn-box box-2"></div>
        </QuizBox>
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
`

const QuizTitle = styled.div`
  position: relative;
  width: 100%;
  height: 105px;
  margin: 40px 0 0;
  border: 1px solid #767676;
  display: flex;
  align-items: center;
  justify-content: center;

  .question-number-box {
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #767676;
    background-color: #fff;
  }

  .box-1 {
    top: -20px;
    left: 33%;
    z-index: 2;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
  }

  .box-2 {
    top: -16px;
    left: 34%;
    background-color: #faea59;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 12px 0 0;
  }
`

const QuizBox = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #767676;
  margin: 20px 0 0;

  .answer-btn {
    width: 100%;
    padding: 15px 0 25px;
    font-size: 16px;
    border-bottom: 1px solid #767676;
  }

  .btn-4 {
    border: 0;
  }

  .next-btn-box {
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #767676;
    border-radius: 20px;
    background-color: #fff;
  }

  .box-1 {
    bottom: -20px;
    left: 33%;
    z-index: 2;
  }

  .box-2 {
    bottom: -24px;
    left: 34%;
    background-color: #faea59;
  }

  .next-btn {
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 50%;
  }
`
export default QuizPaper
