import React, { useCallback } from 'react'
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'

const DoubleCheckModal = ({ type, doubleCheck, setDoubleCheck, title, question, children }) => {
  window.addEventListener('keyup', (e) => {
    if (doubleCheck && e.key === 'Escape') {
      setDoubleCheck(null)
    }
    if (!doubleCheck && e.key === 'Escape') {
      setDoubleCheck(null)
    }
  })

  const handleOverlayClick = useCallback(() => setDoubleCheck(null), [setDoubleCheck])
  const handleContentClick = useCallback((e) => e.stopPropagation(), [])

  if (type === 'exist-onlyConfirm') {
    return (
      <Backdrop open={!doubleCheck} sx={{ zIndex: 10000 }} onClick={handleOverlayClick}>
        <Container onClick={handleContentClick}>
          <div>
            <div className="title-box">{title}</div>
            <div className="question-box">{question}</div>
          </div>
          <div className="confirm-box">{children}</div>
        </Container>
      </Backdrop>
    )
  }

  if (type === 'exist') {
    return (
      <Backdrop open={!doubleCheck} sx={{ zIndex: 10000 }}>
        <Container>
          <div>
            <div className="title-box">{title}</div>
            <div className="question-box">{question}</div>
          </div>
          <div className="confirm-box">
            <button className="cancel-button" onClick={() => setDoubleCheck(null)}>
              취소
            </button>
            <div>{children}</div>
          </div>
        </Container>
      </Backdrop>
    )
  }
  return (
    <>
      <Backdrop open={doubleCheck} sx={{ zIndex: 10000 }} onClick={handleOverlayClick}>
        <Container onClick={handleContentClick}>
          <div>
            <div className="title-box">{title}</div>
            <div className="question-box">{question}</div>
          </div>
          <div className="confirm-box">{children}</div>
        </Container>
      </Backdrop>
    </>
  )
}

const Container = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 340px;
  height: 130px;
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title-box {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  .question-box {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  .confirm-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    .cancel-button {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

export default DoubleCheckModal
