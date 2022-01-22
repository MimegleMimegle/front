import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as GoogleLogo } from '../styles/image/google_color.svg'

const GoogleButton = (props) => {
  let _clientId = process.env.REACT_APP_GOOGLE_API_KEY
  let _callBack = process.env.REACT_APP_GOOGLE_CALLBACK_URL

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
          window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=235810148650-gku8ffkajo19u6b6nqlofffdt3ta835e.apps.googleusercontent.com&redirect_uri=https://memegle.xyz/redirect/google&response_type=code&scope=email%20profile%20openid&access_type=offline`
        }}
      >
        <Background>
          <WhiteBack>
            <GoogleLogo fill="" width="30px" height="30px" />
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
  background-color: white;
  overflow: hidden;
`

const WhiteBack = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default GoogleButton
