import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as NaverLogo } from '../styles/image/naver.svg'

const NaverButton = (props) => {
  let _clientId = process.env.REACT_APP_NAVER_API_KEY
  let _callBack = process.env.REACT_APP_NAVER_CALLBACK_URL

  function randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
    const stringLength = 6
    let randomstring = ''
    for (let i = 0; i < stringLength; i++) {
      const rnum = Math.floor(Math.random() * chars.length)
      randomstring += chars.substring(rnum, rnum + 1)
    }
    return randomstring
  }
  let newState = randomString()

  return (
    <>
      <a
        onClick={() => {
          window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${_clientId}&redirect_uri=http://localhost:3000/redirect/naver&state=${newState}`
          // window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${_clientId}&redirect_uri=https://memegle.xyz/redirect/naver&state=${newState}`
        }}
      >
        <Background>
          <WhiteBack>
            <NaverLogo fill="#00C300" width="50px" height="50px" />
          </WhiteBack>
        </Background>
      </a>
    </>
  )
}

const Background = styled.div`
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 50px;
  background-color: #00c300;
  overflow: hidden;
`

const WhiteBack = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 35px;
`

export default NaverButton
