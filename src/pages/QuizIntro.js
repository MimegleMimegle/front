import React from 'react'
import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'

const QuizIntro = (props) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: '20px', fontSize: '18px' }}>어느 시대의 밈을 테스트하고 싶으신가요?</div>
          <div>
            <button
              className="select-btn"
              onClick={() => {
                history.push('/quiz/2000')
                window.location.reload()
              }}
            >
              '2000
            </button>
          </div>
          <div>
            <button
              className="select-btn"
              onClick={() => {
                history.push('/quiz/2010')
                window.location.reload()
              }}
            >
              '2010
            </button>
          </div>
          <div>
            <button
              className="select-btn"
              onClick={() => {
                history.push('/quiz/2020')
                window.location.reload()
              }}
            >
              '2020
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 0 10px;
  .select-btn {
    width: 235px;
    height: 47px;
    padding: 0 10px;
    margin: 18px auto;
    border: 1px solid #767676;
    text-align: left;
    font-size: 16px;
  }
`

export default QuizIntro
