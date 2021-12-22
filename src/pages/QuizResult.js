import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'

const QuizResult = (props) => {
  const dispatch = useDispatch()

  const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

  const [copied, setCopied] = React.useState(false)

  const quizUrl = 'http://localhost:3000/quiz'

  const closeCopied = () => {
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const onCopy = () => {
    setCopied(true)
    closeCopied()
  }

  const answerCnt = quiz_list
    ? quiz_list.filter((quiz, i) => {
        return quiz.solution === user_answer_list[i]
      }).length
    : null

  const score = quiz_list ? (100 / quiz_list.length) * answerCnt : null

  React.useEffect(() => {
    if (quiz_list === null) {
      dispatch(quizActions.getQuizListDB())
    }
  }, [])

  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', padding: '30px 0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h4>즉시 인터넷을 끊어야 할 당신!</h4>
            <h1 style={{ padding: '10px 0' }}>{score}점</h1>
            <p>
              {answerCnt}/{quiz_list ? quiz_list.length : null}
            </p>
          </div>
          <div>
            <button
              className="login-page-btn"
              onClick={() => {
                history.push('/login')
              }}
            >
              로그인하고 내 순위 알아보기
            </button>
          </div>
          <div style={{ width: '80%', height: '1px', backgroundColor: '#333' }}></div>
          <div style={{ width: '80%', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div>공유하기</div>
            <div style={{ width: '100%', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button className="share-btn">카카오톡</button>
              <button className="share-btn">페이스북</button>
              <button className="share-btn">트위터</button>
              <CopyToClipboard onCopy={onCopy} text={quizUrl}>
                <button className="share-btn">URL</button>
              </CopyToClipboard>
              {copied ? <span className="link-copied">링크 복사 완료!</span> : null}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

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
    border: 1px solid #d1d1d1;
    border-radius: 10px;
    width: 55px;
    height: 55px;
    font-size: 11px;
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

export default QuizResult
