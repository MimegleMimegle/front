import React from 'react'
import styled from 'styled-components'

const ImageWrapper = ({ children }) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.black};
  z-index: 3000;
  svg {
    color: ${({ theme }) => theme.colors.white};
  }
`

export default ImageWrapper
