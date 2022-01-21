import React, { useCallback } from 'react'
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'

const ConfirmModal = ({ showModal, setShowModal, handleShowModal, title, question, children }) => {
  window.addEventListener('keyup', (e) => {
    if (showModal && e.key === 'Escape') {
      setShowModal(!showModal)
    }
  })

  const handleOverlayClick = useCallback(() => setShowModal(false), [setShowModal])
  const handleContentClick = useCallback((e) => e.stopPropagation(), [])
  return (
    <>
      <Backdrop open={showModal} sx={{ zIndex: 10000 }} onClick={handleOverlayClick}>
        <Container onClick={handleContentClick}>
          <div>
            <div className="title-box">{title}</div>
            <div className="question-box">{question}</div>
          </div>
          <div className="confirm-box">
            <button
              className="cancel-button"
              onClick={() => {
                setShowModal(!showModal)
              }}
            >
              취소
            </button>
            <div>{children}</div>
          </div>
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
  max-width: 300px;
  min-width: 280px;
  width: 100%;
  height: 130px;
  background-color: #fff;
  padding: 24px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-appearance: none;
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
    -webkit-appearance: none;
    gap: 24px;
    .cancel-button {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

export default ConfirmModal
