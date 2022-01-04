import React from 'react'
import styled from 'styled-components'
import { history } from '../redux/ConfigureStore'

import SmileIcon from '../styles/image/smileIcon_Yellow.png'

const HeaderLogo = (props) => {
  return (
    <>
      <Logo
        src={SmileIcon}
        onClick={() => {
          history.push('/')
        }}
      />
    </>
  )
}

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #111;
  cursor: pointer;
  background-color: #fff;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

export default HeaderLogo
