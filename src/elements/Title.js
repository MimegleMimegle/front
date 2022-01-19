import React from 'react'
import styled from 'styled-components'

const Title = ({ children }) => {
  return (
    <>
      <TextBox>
        <Text>{children}</Text>
      </TextBox>
    </>
  )
}

const TextBox = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
  box-shadow: inset 0 -5px 0 ${({ theme }) => theme.colors.yellow};
  line-height: 14px;
`

export default Title
