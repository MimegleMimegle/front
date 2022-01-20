import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { actionCreators as quizActions } from '../redux/modules/quiz'

import Grid from '../elements/Grid'
import QuizResult from '../pages/QuizResult'
import CircularProgress from '@mui/material/CircularProgress'

const QuizPaper = (props) => {
  const category = useParams().category
  const dispatch = useDispatch()
  const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const loading = useSelector((state) => state.quiz.is_loading)

  const [showResult, setShowResult] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [clicked1, setClicked1] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const [clicked3, setClicked3] = useState(false)
  const [clicked4, setClicked4] = useState(false)

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

  const submitAnswer = (e) => {
    if (currentIndex === 9) {
      dispatch(quizActions.addAnswer(answer))
      setShowResult(true)
    } else {
      dispatch(quizActions.addAnswer(answer))
      setCurrentIndex(currentIndex + 1)
    }
    setClicked1(false)
    setClicked2(false)
    setClicked3(false)
    setClicked4(false)
  }

  React.useEffect(() => {
    dispatch(quizActions.getQuizListDB(category))
  }, [])

  const quiz = quiz_list ? quiz_list[currentIndex] : null

  return (
    <>
      {!showResult ? (
        !loading ? (
          <Wrapper>
            <Grid flex_center>
              <h2 className="quiz-category">Lv. {category === 'lv1' ? '1' : category === 'lv2' ? '2' : '3'}</h2>
            </Grid>
            <QuizTitle>
              <div className="question-number-box box-1">Q. {currentIndex + 1}</div>
              <div className="question-number-box box-2"></div>
              <h2 className="title">{quiz ? quiz.question : null}</h2>
              <Grid flex_center height="100%" overflow="hidden" margin="16px 0 0">
                <img src={quiz?.quizImage} className="quiz-image" />
              </Grid>
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
          <Grid flex_center height="100%">
            <CircularProgress color="inherit" />
          </Grid>
        )
      ) : (
        <QuizResult quiz_list={quiz_list} category={category} />
      )}
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 360px;
  transition: all 0.1s ease-in-out;
  .quiz-category {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 600;
  }
`

const QuizTitle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: 48px 36px 20px;
  margin: 30px 0 0;
  border: 2px solid ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .question-number-box {
    width: 120px;
    height: 48px;
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
  .box-1 {
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    background-color: ${({ theme }) => theme.colors.yellow};
  }

  .box-2 {
    top: -24px;
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
    background-color: ${({ theme }) => theme.colors.white};
  }

  .title {
    width: 100%;
    height: fit-content;
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  .quiz-image {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
`

const QuizBox = styled.div`
  position: relative;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.black};
  margin: 20px 0 0;
  transition: background-color 0.1s ease-in-out;

  .answer-btn {
    width: 100%;
    height: fit-content;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    padding: 16px 36px;
    line-height: 1.3;
  }

  .btn-4 {
    border: 0;
  }

  .clicked {
    transition: background-color 0.1s ease-in-out;
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`

const ButtonSection = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 0 20px;
  .next-btn-box {
    width: 120px;
    height: 48px;
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.black};
    border-radius: 48px;
    background-color: ${({ theme }) => theme.colors.blue};
    .next-btn {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 48px;
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-family: 'YdestreetB';
      font-style: normal;
      font-weight: normal;
      :disabled {
        background-color: ${({ theme }) => theme.colors.line};
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }

  .box-1 {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    transition-duration: 0.3s;
    &:active {
      left: calc(50%);
      transform: translateX(calc(-50% + 4px));
      top: 4px;
    }
  }

  .box-2 {
    top: 4px;
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
    background-color: ${({ theme }) => theme.colors.white};
  }
`

export default QuizPaper
