import React from 'react'
import styled from 'styled-components'

const QuizPaper = (props) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', padding: '10px 0' }}>
          <h4 style={{ fontSize: '13px', textAlign: 'left' }}>
            <span>n</span>/10
          </h4>
          <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'left' }}>'국그릇핑크퐁'은 어떤 상황에서 쓰이는 말일까요?</div>
        </div>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <button className="answer-btn">1번</button>
          <button className="answer-btn">2번</button>
          <button className="answer-btn">3번</button>
          <button className="answer-btn">4번</button>
        </div>
        <div style={{ padding: '5px 0', fontSize: '12px' }}>
          힌트: <span>땡땡땡</span>
        </div>
        {/* <div style={{ width: '100%', padding: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <button>뒤로 가기</button>
          <button>다음 문제</button>
        </div> */}
      </Wrapper>
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
  /* border: 5px solid #333; */
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 360px;

  .answer-btn {
    font-size: 16px;
    color: #ffffff;
    background-color: rgb(115, 98, 255);
    border-radius: 5px;
    height: 50px;
    padding: 4px;
    margin: 4px;
    width: 100%;
    font-weight: 700;
    transition: background-color 0.1s ease-in-out;

    &:hover {
      background-color: rgb(152, 141, 253);
    }
  }
`

export default QuizPaper
