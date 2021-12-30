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

  React.useEffect(() => {
    if (quiz_list === null) {
      dispatch(quizActions.getQuizListDB(category))
    }
  }, [dispatch])

  const quiz = quiz_list ? quiz_list[currentIndex] : null

  return (
    <>
      {!showResult ? (
        <Wrapper>
          <QuizTitle>
            <div className="question-number-box box-1">Q. {currentIndex + 1}</div>
            <div className="question-number-box box-2"></div>
            <h2 className="title">{quiz ? quiz.question : null}</h2>
          </QuizTitle>
          <QuizBox>
            <button className={`answer-btn ${clicked1 ? 'clicked' : ''}`} value={quiz ? quiz.choice[0] : ''} onClick={clickAnswer1}>
              {quiz ? quiz.choice[0] : null}
            </button>
            <button className={`answer-btn ${clicked2 ? 'clicked' : ''}`} value={quiz ? quiz.choice[1] : ''} onClick={clickAnswer2}>
              {quiz ? quiz.choice[1] : null}
            </button>
            <button className={`answer-btn ${clicked3 ? 'clicked' : ''}`} value={quiz ? quiz.choice[2] : ''} onClick={clickAnswer3}>
              {quiz ? quiz.choice[2] : null}
            </button>
            <button className={`answer-btn btn-4 ${clicked4 ? 'clicked' : ''}`} value={quiz ? quiz.choice[3] : ''} onClick={clickAnswer4}>
              {quiz ? quiz.choice[3] : null}
            </button>
          </QuizBox>
          <ButtonSection>
            <div className="next-btn-box box-1">
              <button className="next-btn" onClick={submitAnswer} disabled={!(clicked1 || clicked2 || clicked3 || clicked4)}>
                {currentIndex === 9 ? '결과' : '다음'}
              </button>
            </div>
            <div className="next-btn-box box-2"></div>
          </ButtonSection>
        </Wrapper>
      ) : (
        <QuizResult quiz_list={quiz_list} />
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
  height: 164px;
  padding: 42px 36px;
  margin: 40px 0 0;
  border: 1px solid #111;
  display: flex;
  align-items: center;
  justify-content: center;

  .question-number-box {
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #111;
    background-color: #fff;
  }

  .box-1 {
    top: -20px;
    left: 33%;
    z-index: 2;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: 700;
    background-color: #faea59;
  }

  .box-2 {
    top: -16px;
    left: 34%;
    background-color: #fff;
  }

  .title {
    width: 100%;
    height: 100%;
    text-align: left;
    font-size: 14px;
    line-height: 24px;
  }
`

const QuizBox = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #111;
  margin: 20px 0 0;
  transition: background-color 0.1s ease-in-out;

  .answer-btn {
    width: 100%;
    height: 56px;
    font-size: 14px;
    border-bottom: 1px solid #111;
    padding: 0;
  }

  .btn-4 {
    border: 0;
  }

  .clicked {
    transition: background-color 0.1s ease-in-out;
    background-color: #faea59;
  }
`

const ButtonSection = styled.div`
  position: relative;
  width: 100%;
  .next-btn-box {
    width: 107px;
    height: 40px;
    position: absolute;
    border: 1px solid #111;
    border-radius: 20px;
    background-color: #00a0ff;
    .next-btn {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 20px;
      font-size: 18px;
      font-weight: 700;
      :disabled {
        background-color: #ededed;
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }

  .box-1 {
    top: 24px;
    left: 49.5%;
    transform: translateX(-49.5%);
    z-index: 2;
    transition-duration: 0.3s;
    &:active {
      left: 51%;
      transform: translateX(-51%);
      top: 28px;
    }
  }

  .box-2 {
    top: 28px;
    left: 51%;
    transform: translateX(-51%);
    background-color: #fff;
  }
`
export default QuizPaper
