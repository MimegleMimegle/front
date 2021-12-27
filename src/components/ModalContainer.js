import React from 'react'
import styled from 'styled-components'

const ModalContainer = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  )
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 140px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
`

export default ModalContainer
