import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as KakaoLogo } from '../styles/image/kakaotalk.svg'

const KakaoButton = (props) => {
  let _apiKey = process.env.REACT_APP_KAKAO_API_KEY
  let _callBack = process.env.REACT_APP_KAKAO_CALLBACK_URL

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
          window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${_apiKey}&redirect_uri=http://localhost:3000/redirect/kakao&response_type=code`
          // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${_apiKey}&redirect_uri=https://memegle.xyz/redirect/kakao&response_type=code`
        }}
      >
        <Background>
          <BlackBack>
            <KakaoLogo fill="#FFE330" width="55px" height="55px"></KakaoLogo>
          </BlackBack>
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
  background-color: #ffe330;
  overflow: hidden;
`

const BlackBack = styled.div`
  background-color: #3a1d1d;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 30px;

  -webkit-appearance: none;
`

export default KakaoButton
