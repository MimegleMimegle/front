import React from 'react'
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'

const AlertModal = ({ showModal, children }) => {
  return (
    <>
      <Backdrop open={showModal} sx={{ zIndex: 10000 }}>
        <Container>
          <AlertText>{children}</AlertText>
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
  align-items: center;
  justify-content: center;
`

const AlertText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

export default AlertModal
