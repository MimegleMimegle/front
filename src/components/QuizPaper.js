import React from 'react'
import styled from 'styled-components'

const QuizPaper = (props) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', height: '100%', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h4>Q1. 질문</h4>
        </div>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* <form> */}
          <div className="radio-item">
            <input type="radio" name="qNum" value="의미" />
            단어의 뜻1
          </div>
          <div className="radio-item">
            <input type="radio" name="qNum" value="의미" />
            단어의 뜻2
          </div>
          <div className="radio-item">
            <input type="radio" name="qNum" value="의미" />
            단어의 뜻3
          </div>
          <div className="radio-item">
            <input type="radio" name="qNum" value="의미" />
            단어의 뜻4
          </div>
          {/* </form> */}
        </div>
        <div style={{ padding: '10px 0' }}>
          <p>힌트: </p>
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
  max-width: 345px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d1d1d1;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 360px;

  .radio-item {
    padding: 10px 0;
  }
`

export default QuizPaper
