import React, { useEffect } from 'react'
import styled from 'styled-components'
import { userApi } from '../shared/api'
import { actionCreators as userActions } from '../redux/modules/user'
import { ReactComponent as NaverLogo } from '../styles/image/naver.svg'

const NaverButton = (props) => {
  const href = window.location.href
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

  useEffect(() => {
    async function naverLogin() {
      try {
        // console.log(newState)
        const url = new URL(window.location.href)
        let params = url.href
        let code = params.get('code')
        let state = params.get('state')
        const result = await userApi.NaverLogin(code, state)
        console.log(result)
      } catch (error) {
        console.log('네이버 로그인 문제 발생', error.response)
      }
    }
    naverLogin()
  }, [])

  return (
    <>
      <button
        onClick={() => {
          window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${_clientId}&redirect_uri=http://localhost:3000/redirect&state=${newState}`
        }}
      >
        <NaverLogo fill="#00C300" width="53px" height="53px" />
      </button>
    </>
  )
}

export default NaverButton
