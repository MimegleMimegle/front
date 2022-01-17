import React, { useCallback } from 'react'
import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'

const AlertModal = ({ showModal, children }) => {
  return (
    <>
      <Backdrop open={showModal} sx={{ zIndex: 10000 }}>
        <Container>{children}</Container>
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
  align-items: center;
  justify-content: center;
`

export default AlertModal
