import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'

import QuizResult from '../pages/QuizResult'

const QuizPaper = (props) => {
  const category = useParams().category

  const dispatch = useDispatch()

  const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  const [showResult, setShowResult] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answer, setAnswer] = React.useState('')
  const [clicked1, setClicked1] = React.useState(false)
  const [clicked2, setClicked2] = React.useState(false)
  const [clicked3, setClicked3] = React.useState(false)
  const [clicked4, setClicked4] = React.useState(false)

  const clickAnswer1 = (e) => {
    setAnswer(e.target.value)
    setClicked1(true)
    setClicked2(false)
    setClicked3(false)
    setClicked4(false)
  }

  const clickAnswer2 = (e) => {
    setAnswer(e.target.value)
    setClicked1(false)
    setClicked2(true)
    setClicked3(false)
    setClicked4(false)
  }

  const clickAnswer3 = (e) => {
    setAnswer(e.target.value)
    setClicked1(false)
    setClicked2(false)
    setClicked3(true)
    setClicked4(false)
  }

  const clickAnswer4 = (e) => {
    setAnswer(e.target.value)
    setClicked1(false)
    setClicked2(false)
    setClicked3(false)
    setClicked4(true)
  }

  console.log(currentIndex)
  console.log(answer)
  console.log(clicked1)
  console.log(clicked2)
  console.log(clicked3)
  console.log(clicked4)
  console.log(user_answer_list)

  const submitAnswer = () => {
    setClicked1(false)
    setClicked2(false)
    setClicked3(false)
    setClicked4(false)
    // 추후 quiz_list ? currentIndex === quiz_list.length -1 로 조건문 변경
    if (currentIndex === 9) {
      setShowResult(true)
    } else {
      dispatch(quizActions.addAnswer(answer))
      setCurrentIndex(currentIndex + 1)
    }
  }

  const quiz = quiz_list ? quiz_list[currentIndex] : null

  React.useEffect(() => {
    if (quiz_list === null) {
      dispatch(quizActions.getQuizListDB(category))
    }
    //   if (quiz_list && user_answer_list.length === quiz_list.length) {
    //     history.push('/quiz/result')
    //     return
    //   }
    // }, [user_answer_list])

    // if (quiz_list && user_answer_list.length === quiz_list.length) {
    //   return null
    // }
  })

  return (
    <>
      {!showResult ? (
        <Wrapper>
          <QuizTitle>
            <div className="question-number-box box-1">Q. 01</div>
            <div className="question-number-box box-2"></div>
            <h2 className="title">Q1. Quiz Title Section</h2>
          </QuizTitle>
          <QuizBox>
            <div>
              <button className={`answer-btn ${clicked1 ? 'clicked' : ''}`} value="answer1" onClick={clickAnswer1}>
                answer1
              </button>
            </div>
            <div>
              <button className={`answer-btn ${clicked2 ? 'clicked' : ''}`} value="answer2" onClick={clickAnswer2}>
                answer2
              </button>
            </div>
            <div>
              <button className={`answer-btn ${clicked3 ? 'clicked' : ''}`} value="answer3" onClick={clickAnswer3}>
                answer3
              </button>
            </div>
            <div>
              <button className={`answer-btn btn-4 ${clicked4 ? 'clicked' : ''}`} value="answer4" onClick={clickAnswer4}>
                answer4
              </button>
            </div>
            <div className="next-btn-box box-1">
              {/* 추후 quiz_list? currentIndex === quiz_list.length -1 ? 로 조건문 변경 */}
              {currentIndex === 9 ? (
                <button className="next-btn" onClick={submitAnswer} disabled={!(clicked1 || clicked2 || clicked3 || clicked4)}>
                  결과
                </button>
              ) : (
                <button className="next-btn" onClick={submitAnswer} disabled={!(clicked1 || clicked2 || clicked3 || clicked4)}>
                  다음
                </button>
              )}
            </div>
            <div className="next-btn-box box-2"></div>
          </QuizBox>
        </Wrapper>
      ) : (
        <QuizResult />
      )}
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
    background-color: #fff27b;
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
  transition: background-color 0.1s ease-in-out;

  .answer-btn {
    width: 100%;
    padding: 15px 0 25px;
    font-size: 16px;
    border-bottom: 1px solid #767676;
  }

  .btn-4 {
    border: 0;
  }

  .clicked {
    transition: background-color 0.1s ease-in-out;
    background-color: #faea59;
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
    transition-duration: 0.5s;
    &:active {
      margin-left: 1%;
      margin-top: 10px;
    }
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
    border-radius: 20px;
    /* transition-duration: 0.5s;
    &:active {
      margin-left: 1%;
      margin-top: 4px;
    } */

    :disabled {
      background-color: #ededed;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`
export default QuizPaper
