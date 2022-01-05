import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { history } from '../redux/ConfigureStore'
import useScript from '../util/useScript'

import { KakaoShareButton } from '../shared/kakaoShare'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share'

import OneQuiz from '../components/OneQuiz'
import Header from '../components/Header'
import { ReactComponent as GoBack } from '../styles/icons/되돌아가기_24dp.svg'
import { ReactComponent as CopyLink } from '../styles/icons/링크복사_24dp.svg'

const QuizResult = ({ quiz_list }) => {
  useScript('https://developers.kakao.com/sdk/js/kakao.js')
  const currentUrl = window.location.href
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  const [copied, setCopied] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const closeCopied = () => {
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const onCopy = () => {
    setCopied(true)
    closeCopied()
  }

  const handleShowQuiz = () => {
    setShowQuiz(!showQuiz)
  }

  const answerCnt = quiz_list
    ? quiz_list.filter((quiz, i) => {
        return quiz.solution === user_answer_list[i]
      }).length
    : null

  const score = quiz_list ? (100 / quiz_list.length) * answerCnt : null

  return (
    <>
      <Header type="QuizResult" location="밈퀴즈"></Header>
      <Wrapper>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <QuizResultBox>
            <div className="quiz-subject box-1">결과</div>
            <div className="quiz-subject box-2"></div>
            <div style={{ padding: '50px 0 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: '700' }}>{answerCnt}/10</span>
              <h2 style={{ fontSize: '14px', padding: '10px 0 0' }}>치료가 필요할 정도로 심각한</h2>
              <h2 className="resultDesc">'밈 중독'입니다.</h2>
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
          <div style={{ width: '80%', padding: '20px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
              <TextButton
                onClick={() => {
                  history.push('/quiz')
                }}
              >
                다른 테스트 하러 가기
              </TextButton>
            </div>
            <div style={{ width: '100%', margin: '5px 0' }}>
              <CircleButtonBox>
                <div className="circle-button btn-1">
                  <CopyLink />
                </div>
                <div className="circle-button btn-2"></div>
              </CircleButtonBox>
              <TextButton>친구에게 공유하기</TextButton>
            </div>
            <div style={{ width: '100%', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FacebookShareButton url={currentUrl}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl}>
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
              <KakaoShareButton />
              <LineShareButton url={currentUrl}>
                <LineIcon size={40} round={true} />
              </LineShareButton>
              <CopyToClipboard onCopy={onCopy} text={currentUrl}>
                <button className="share-btn">URL</button>
              </CopyToClipboard>
            </div>
            {copied ? <span className="link-copied">링크 복사 완료!</span> : null}
          </div>
          <QuizContainer>
            {showQuiz &&
              quiz_list &&
              quiz_list.map((quiz, index) => {
                return <OneQuiz key={index} quiz={quiz} index={index} />
              })}
          </QuizContainer>
        </div>
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
  .share-btn {
    border: 1px solid ${({ theme }) => theme.colors.yellow};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.yellow};
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    margin: 0 0 6px;
  }
  .link-copied {
    background-color: ${({ theme }) => theme.colors.black};
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 7px 12px;
    position: absolute;
    width: auto;
    min-width: 50px;
    max-width: 300px;
    word-wrap: break-word;
    z-index: 9999;
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
    font-weight: 700;
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

  .resultDesc {
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }
`

const QuizContainer = styled.div`
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
      font-weight: 700;
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
  font-weight: 700;
  padding: 10px 0;
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
