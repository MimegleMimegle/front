import React from 'react'
import styled from 'styled-components'
import Grid from '../../elements/Grid'

const ImageWrapper = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Grid flex_start column height="100%">
          {children}
        </Grid>
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
  padding: 24px 0;
  background-color: ${({ theme }) => theme.colors.black};
  z-index: 10000;
  .icon {
    fill: #fff;
    cursor: pointer;
  }
`

export default ImageWrapper
