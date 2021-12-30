import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'
import useScript from '../util/useScript'

import { KakaoShareButton } from '../shared/kakaoShare'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share'

import OneQuiz from '../components/OneQuiz'
import MemegleButton from '../shared/MemegleButton'

const QuizResult = ({ quiz_list }) => {
  useScript('https://developers.kakao.com/sdk/js/kakao.js')
  console.log(window.Kakao)

  const category = useParams().category

  const dispatch = useDispatch()

  // const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  const [copied, setCopied] = React.useState(false)
  const [showQuiz, setShowQuiz] = React.useState(false)

  const currentUrl = window.location.href

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

  // React.useEffect(() => {
  //   if (quiz_list === null) {
  //     dispatch(quizActions.getQuizListDB(category))
  //   }
  // }, [])

  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <QuizResultBox>
            <div className="quiz-year-box box-1">결과</div>
            <div className="quiz-year-box box-2"></div>
            <div style={{ padding: '50px 0 30px' }}>
              <h2>점수 {score}점</h2>
              <span>{answerCnt}/10</span>
              <h2 className="resultDesc">당신은 심각할 정도의 밈 중독입니다.</h2>
            </div>
          </QuizResultBox>
          <div style={{ width: '80%', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div>공유하기</div>
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
              {copied ? <span className="link-copied">링크 복사 완료!</span> : null}
            </div>
          </div>
          <ResultButtonContainer>
            <div className="resultButtonBox box1">
              <button className="resultButton" onClick={handleShowQuiz}>
                정답확인
              </button>
            </div>
            <div className="resultButtonBox box2"></div>
          </ResultButtonContainer>
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
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .login-page-btn {
    font-size: 16px;
    padding: 10px;
    margin: 20px auto;
    background-color: rgb(115, 98, 255);
    border-radius: 5px;
    color: #fff;
    font-weight: 700;
    transition: background-color 0.1s ease-in-out;
    &:hover {
      background-color: rgb(152, 141, 253);
    }
  }
  .share-btn {
    border: 1px solid rgb(115, 98, 255);
    border-radius: 20px;
    background-color: rgb(115, 98, 255);
    width: 40px;
    height: 40px;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    margin: 0 0 6px;
  }
  .link-copied {
    background-color: #000000;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
    border-radius: 5px;
    color: #ffffff;
    font-size: 12px;
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
  border: 1px solid #767676;
  display: flex;
  align-items: center;
  justify-content: center;

  .quiz-year-box {
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

  .resultDesc {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 12px 0 0;
  }
`

const QuizContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ResultButtonContainer = styled.div`
  width: 100%;
  height: 60px;
  /* max-height: 200px; */
  position: relative;

  .resultButtonBox {
    width: 100px;
    height: 40px;
    position: absolute;
    border: 1px solid #767676;
    border-radius: 20px;
    background-color: #fff;

    .resultButton {
      padding: 0;
      width: 100px;
      height: 40px;
    }
  }

  .box1 {
    left: 34%;
    z-index: 2;
    transition-duration: 0.5s;
    &:active {
      left: 35%;
      margin-top: 4px;
    }
  }

  .box2 {
    left: 35%;
    margin-top: 4px;
    background-color: #faea59;
  }
`

export default QuizResult
