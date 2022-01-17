import React from 'react'
import styled from 'styled-components'

const FloatingButton = ({ children, _onClick }) => {
  return (
    <>
      <Container onClick={_onClick}>{children}</Container>
    </>
  )
}

FloatingButton.defaultProps = {
  children: null,
  _onClick: () => {},
}

const Container = styled.div`
  width: 64px;
  height: 64px;
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 120px;
  right: 16px;
  border-radius: 60px;
  z-index: 1000;
  cursor: pointer;
  box-shadow: 0 4px 20px 4px hsl(0deg 0% 64% / 35%);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    /* background-color: #5b5b5b; */
    background-color: ${({ theme }) => theme.colors.blue};
  }
`

export default FloatingButton
