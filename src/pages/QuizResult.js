import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'

import ShareBottomSheet from '../components/ShareBottomSheet'
import OneQuiz from '../components/OneQuiz'
import Header from '../components/Header'
import { ReactComponent as GoBack } from '../styles/icons/되돌아가기_24dp.svg'
import { ReactComponent as CopyLink } from '../styles/icons/링크복사_24dp.svg'

const QuizResult = ({ quiz_list, userAnswerList, setUserAnswerList }) => {
  const dispatch = useDispatch()
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  const [showQuiz, setShowQuiz] = useState(false)
  const [resultText, setResultText] = useState({ sub: '', main: '' })
  const [shareVisible, setShareVisible] = useState(false)

  const handleShareVisible = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareVisible(!shareVisible)
  }
  console.log(userAnswerList)

  const handleShowQuiz = () => {
    setShowQuiz(!showQuiz)
  }

  const handleInitUserAnswer = () => {
    history.push('/quiz')
    dispatch(quizActions.initAnswer())
  }

  const answerCnt = quiz_list
    ? quiz_list.filter((quiz, i) => {
        return quiz.solution === user_answer_list[i]
      }).length
    : null

  useEffect(() => {
    if (answerCnt >= 0 && answerCnt < 4) {
      setResultText({ sub: '아주 작은 기적...', main: '"밈기적."' })
    } else if (answerCnt >= 4 && answerCnt < 8) {
      setResultText({ sub: `${answerCnt}개나 맞춘 나,`, main: '제법 "밈잘알"이에요.' })
    } else {
      setResultText({ sub: '치료가 필요할 정도로 심각한', main: '"밈 중독"입니다.' })
    }
  }, [])

  return (
    <>
      <Header type="QuizResult" location="밈퀴즈"></Header>
      <Wrapper>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <QuizResultBox>
            <div className="quiz-subject box-1">결과</div>
            <div className="quiz-subject box-2"></div>
            <div style={{ padding: '50px 0 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="result-text__answerCnt">{answerCnt}/10</span>
              <h2 className="result-text__sub">{resultText.sub}</h2>
              <h2 className="result-text__main">{resultText.main}</h2>
            </div>
          </QuizResultBox>
          <ResultButtonContainer>
            <div className="resultButtonBox box1">
              <button className="resultButton" onClick={handleShowQuiz}>
                정답확인
              </button>
            </div>
            <div className="resultButtonBox box2"></div>
          </ResultButtonContainer>
          <div style={{ width: '80%', padding: '12px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', margin: '5px 0' }}>
              <CircleButtonBox>
                <div
                  className="circle-button btn-1"
                  onClick={() => {
                    history.push('/quiz')
                  }}
                >
                  <GoBack />
                </div>
                <div className="circle-button btn-2"></div>
              </CircleButtonBox>
              <TextButton onClick={handleInitUserAnswer}>다른 테스트 하러 가기</TextButton>
            </div>
            <div style={{ width: '100%', margin: '5px 0' }}>
              <CircleButtonBox>
                <div className="circle-button btn-1" onClick={handleShareVisible}>
                  <CopyLink />
                </div>
                <div className="circle-button btn-2"></div>
              </CircleButtonBox>
              <TextButton onClick={handleShareVisible}>친구에게 공유하기</TextButton>
            </div>
          </div>
          <QuizContainer>
            {showQuiz &&
              quiz_list &&
              quiz_list.map((quiz, index) => {
                return <OneQuiz key={index} quiz={quiz} index={index} />
              })}
          </QuizContainer>
        </div>
        {shareVisible && <ShareBottomSheet shareVisible={shareVisible} setShareVisible={setShareVisible} />}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-height: 620px;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const QuizResultBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 40px 0 0;
  border: 1px solid ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;

  .quiz-subject {
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
  }

  .box-1 {
    top: -20px;
    left: 49.5%;
    transform: translateX(-49.5%);
    z-index: 2;
    text-align: center;
    line-height: 40px;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    background-color: ${({ theme }) => theme.colors.yellow};
  }

  .box-2 {
    top: -16px;
    left: 51%;
    transform: translateX(-51%);
    background-color: ${({ theme }) => theme.colors.white};
  }
  .result-text__answerCnt {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-family: 'YdestreetB';
    font-style: normal;
    font-weight: normal;
  }

  .result-text__sub {
    padding: 10px 0 0;
    font-size: ${({ theme }) => theme.fontSizes.lg};
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
  }
`

const QuizContainer = styled.div`
  padding: 0 0 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ResultButtonContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  height: 60px;
  /* max-height: 200px; */
  position: relative;

  .resultButtonBox {
    width: 135px;
    height: 40px;
    position: absolute;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    .resultButton {
      padding: 0;
      width: 135px;
      height: 40px;
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-family: 'YdestreetB';
      font-style: normal;
      font-weight: normal;
    }
  }

  .box1 {
    left: 49.5%;
    transform: translateX(-49.5%);
    background-color: ${({ theme }) => theme.colors.blue};
    z-index: 2;
    transition-duration: 0.5s;
    &:active {
      left: 51%;
      transform: translateX(-51%);
      margin-top: 4px;
    }
  }

  .box2 {
    left: 51%;
    transform: translateX(-51%);
    margin-top: 4px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`

const TextButton = styled.button`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
  padding: 12px 0;
`

const CircleButtonBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .circle-button {
    position: absolute;
    width: 36px;
    height: 36px;
    border: 1px solid ${({ theme }) => theme.colors.black};
    border-radius: 20px;
  }
  .btn-1 {
    left: 24px;
    background-color: ${({ theme }) => theme.colors.orange};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 300;
    cursor: pointer;
    transition-duration: 0.5s;
    &:active {
      left: 27px;
      margin-top: 3px;
    }
  }
  .btn-2 {
    left: 27px;
    top: 3px;
  }
`

export default QuizResult
