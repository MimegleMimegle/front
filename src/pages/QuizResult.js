import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { history } from '../redux/ConfigureStore'
import { useParams } from 'react-router-dom' // 삭제 X (props로 받은 useParams().category)
import { actionCreators as quizActions } from '../redux/modules/quiz'
import { quizApi } from '../shared/api'

import Grid from '../elements/Grid'
import BottomPopup from '../components/BottomPopup'
import ShareBottomSheet from '../components/ShareBottomSheet'
import OneQuiz from '../components/OneQuiz'
import Footer from '../components/Footer'
import { ReactComponent as GoBackIcon } from '../styles/icons/되돌아가기_24dp.svg'
import { ReactComponent as CopyLinkIcon } from '../styles/icons/link.svg'
import { ReactComponent as CloseIcon } from '../styles/icons/X_24dp.svg'

const QuizResult = ({ quiz_list, category }) => {
  const dispatch = useDispatch()
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)
  const answerCnt = quiz_list
    ? quiz_list.filter((quiz, i) => {
        return quiz.solution === user_answer_list[i]
      }).length
    : null

  const [showQuiz, setShowQuiz] = useState(false)
  const [resultText, setResultText] = useState({ sub: '', main: '' })
  const [shareVisible, setShareVisible] = useState(false)

  const handleShareVisible = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareVisible(!shareVisible)
  }

  const handleShowQuiz = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuiz(!showQuiz)
  }

  const handleMoveQuizIntro = (e) => {
    e.preventDefault()
    e.stopPropagation()
    history.push('/quiz')
    dispatch(quizActions.initAnswer())
  }

  useEffect(() => {
    if (answerCnt >= 0 && answerCnt < 4) {
      setResultText({ sub: '아주 작은 기적...', main: '"밈기적."' })
    } else if (answerCnt >= 4 && answerCnt < 8) {
      setResultText({ sub: `${answerCnt}개나 맞춘 나,`, main: '제법 "밈잘알"이에요.' })
    } else {
      setResultText({ sub: '치료가 필요할 정도로 심각한', main: '"밈중독"입니다.' })
    }
  }, [])

  useEffect(function () {
    async function submitQuizScore() {
      try {
        const result = await quizApi.submitScore(category, answerCnt)
      } catch (error) {
        console.log('퀴즈 결과 전송 문제 발생', error.response)
      }
    }
    submitQuizScore()
  }, [])

  return (
    <>
      <Wrapper>
        <Grid flex_center>
          <h2 className="quiz-category">Lv. {category === 'lv1' ? '1' : category === 'lv2' ? '2' : '3'}</h2>
        </Grid>
        <Grid flex_center column>
          <QuizResultBox>
            <div className="quiz-subject box-1">결과</div>
            <div className="quiz-subject box-2"></div>
            <Grid flex_center column padding="40px 0 20px">
              <h2 className="result-text__sub">{resultText.sub}</h2>
              <h2 className="result-text__main">{resultText.main}</h2>
              <span className="result-text__answerCnt">{answerCnt}/10</span>
            </Grid>
          </QuizResultBox>
          <ResultButtonContainer>
            <div className="resultButtonBox box1">
              <button className="resultButton" onClick={handleShowQuiz}>
                정답확인
              </button>
            </div>
            <div className="resultButtonBox box2"></div>
          </ResultButtonContainer>
          <TextButtonContainer>
            <Grid flex_center padding="12px 0">
              <div className="circle-button-box">
                <div
                  className="circle-button btn-1"
                  onClick={() => {
                    history.push('/quiz')
                  }}
                >
                  <GoBackIcon />
                </div>
                <div className="circle-button btn-2"></div>
              </div>
              <button className="text-button" onClick={handleMoveQuizIntro}>
                다른 테스트 하러 가기
              </button>
            </Grid>
            <Grid flex_center padding="12px 0">
              <div className="circle-button-box">
                <div className="circle-button btn-1" onClick={handleShareVisible}>
                  <CopyLinkIcon />
                </div>
                <div className="circle-button btn-2"></div>
              </div>
              <button className="text-button" onClick={handleShareVisible}>
                친구에게 공유하기
              </button>
            </Grid>
          </TextButtonContainer>
          <BottomPopup isOpen={showQuiz} onClose={() => setShowQuiz(false)} heightPixel={400}>
            <QuizContainer>
              <CloseButtonBox>
                <CloseIcon className="close-icon" onClick={() => setShowQuiz(false)} fill="#333" />
              </CloseButtonBox>
              <div className="quiz-answer-box">
                {quiz_list &&
                  quiz_list.map((quiz, index) => {
                    return <OneQuiz key={index} quiz={quiz} index={index} />
                  })}
              </div>
            </QuizContainer>
          </BottomPopup>
        </Grid>
        <ShareBottomSheet shareVisible={shareVisible} setShareVisible={setShareVisible} />
      </Wrapper>
      <Footer />
    </>
  )
}

const Wrapper = styled.div`
  padding: 20px 0 84px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .quiz-category {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 600;
  }
`

const QuizResultBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 30px 0 0;
  border: 2px solid ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;

  .quiz-subject {
    width: 120px;
    height: 48px;
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
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
    background-color: ${({ theme }) => theme.colors.yellow};
  }

  .box-2 {
    top: -24px;
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
    background-color: ${({ theme }) => theme.colors.white};
  }
  .result-text__sub {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: normal;
  }
  .result-text__main {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
    padding: 16px 0 6px;
  }
  .result-text__answerCnt {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
  }
`

const QuizContainer = styled.div`
  position: relative;
  padding: 5px 0 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fafbfb;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  z-index: 10001;
  .quiz-answer-box {
    padding: 0 20px 24px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d1d1d1;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
  }
`

const CloseButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 10px 16px;
  .close-icon {
    cursor: pointer;
    width: 30px;
    height: 30px;
  }
`

const ResultButtonContainer = styled.div`
  margin: 20px 0 0;
  width: 100%;
  height: 40px;
  position: relative;

  .resultButtonBox {
    width: 162px;
    height: 52px;
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.black};
    border-radius: 52px;
    background-color: ${({ theme }) => theme.colors.white};
    .resultButton {
      width: 100%;
      height: 100%;
      border-radius: 52px;
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-family: 'YdestreetB';
      font-style: normal;
      font-weight: normal;
    }
  }

  .box1 {
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.blue};
    z-index: 2;
    transition-duration: 0.5s;
    &:active {
      left: calc(50%);
      transform: translateX(calc(-50% + 4px));
      margin-top: 4px;
    }
  }

  .box2 {
    left: calc(50%);
    transform: translateX(calc(-50% + 4px));
    margin-top: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`

const TextButtonContainer = styled.div`
  width: 100%;
  padding: 30px 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .text-button {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
  }
  .circle-button-box {
    position: relative;
    .circle-button {
      position: absolute;
      width: 36px;
      height: 36px;
      border: 2px solid ${({ theme }) => theme.colors.black};
      border-radius: 20px;
    }
    .btn-1 {
      background-color: ${({ theme }) => theme.colors.orange};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 300;
      cursor: pointer;
      transition-duration: 0.5s;
      left: 20px;
      top: -18px;
      &:active {
        left: 23px;
        top: -15px;
      }
    }
    .btn-2 {
      left: 23px;
      top: -15px;
    }
  }
`

export default QuizResult
