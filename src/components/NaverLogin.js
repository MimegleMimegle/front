// import React, { useEffect } from 'react'
// import styled from 'styled-components'
// import { userApi } from '../shared/api'
// import { ReactComponent as NaverLogo } from '../styles/image/naver.svg'

// const NaverButton = (props) => {
//   const href = window.location.href
//   let _clientId = process.env.REACT_APP_NAVER_API_KEY

//   function randomString() {
//     const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
//     const stringLength = 6
//     let randomstring = ''
//     for (let i = 0; i < stringLength; i++) {
//       const rnum = Math.floor(Math.random() * chars.length)
//       randomstring += chars.substring(rnum, rnum + 1)
//     }
//     return randomstring
//   }
//   let newState = randomString()

//   // console.log(newState)

//   const naverLoginDB = (code, state) => {
//     return function (dispatch, getState, { history }) {
//       userApi
//         .NaverLogin(code, state)
//         .then((res) => {
//           console.log(res) // 토큰이 넘어올 것임

//           const ACCESS_TOKEN = res.data.accessToken
//           localStorage.setItem('token', ACCESS_TOKEN) //예시로 로컬에 저장함

//           history.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
//         })
//         .catch((err) => {
//           console.log('네이버로그인 에러', err)
//           window.alert('로그인에 실패하였습니다.')
//           history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
//         })
//     }
//   }

//   let params = new URL(document.location).searchParams
//   let code = params.get('code')
//   let state = params.get('state')

//   return (
//     <>
//       <button
//         onClick={() => {
//           window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${_clientId}&state=${newState}&redirect_uri=http://localhost:3000/login`
//         }}
//       >
//         <NaverLogo fill="#00C300" width="53px" height="53px" />
//       </button>
//     </>
//   )
// }

// export default NaverButton

import React from 'react'
import NaverLogin from 'react-naver-login'
import { ReactComponent as NaverLogo } from '../styles/image/naver.svg'

const NaverButton = () => {
  return (
    <>
      <NaverLogin
        clientId="MqzRjEkh9y1dtldzuTse"
        callbackUrl="http://localhost:3000/login"
        render={(props) => <div onClick={props.onClick}>네이버 로그인</div>}
        onSuccess={(naverUser) => console.log(naverUser)}
        onFailure={() => console.error()}
      />
    </>
  )
}
export default NaverButton
