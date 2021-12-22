import React from 'react'
import styled from 'styled-components'

const QuizResult = (props) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', padding: '30px 0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h4>빨리 인터넷을 끊어야 할 당신!</h4>
            <h1 style={{ padding: '10px 0' }}>100점</h1>
            <p>8/10</p>
          </div>
          <div>
            <button className="login-page-btn">로그인하고 내 순위 알아보기</button>
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
