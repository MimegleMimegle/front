import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'
import { actionCreators as quizActions } from '../redux/modules/quiz'

const QuizResult = (props) => {
  const dispatch = useDispatch()

  const quiz_list = useSelector((state) => state.quiz.quiz_list)
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list)

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
          <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div>공유하기</div>
            <div>sns</div>
            <div>link</div>
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
`

export default QuizResult
