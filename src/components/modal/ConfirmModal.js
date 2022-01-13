import React, { useCallback } from 'react'
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'
import { history } from '../../redux/ConfigureStore'

const ConfirmModal = ({ showModal, setShowModal, handleShowModal, question, children }) => {
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
          <div className="question-box">{question}</div>
          <div className="confirm-box">
            <div>
              <button className="cancel-button" onClick={handleShowModal}>
                취소
              </button>
            </div>
            <div className="confirm-button">{children}</div>
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
  width: 320px;
  height: 100px;
  background-color: #fff;
  padding: 20px 20px 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .question-box {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.black};
  }
  .confirm-box {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 24px;
    .cancel-button {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      color: ${({ theme }) => theme.colors.grey};
    }
  }
`

export default ConfirmModal
