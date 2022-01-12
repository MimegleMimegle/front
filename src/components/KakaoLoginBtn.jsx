import React, { Component } from 'react'

class KakaoLogin extends Component {
  componentDidMount() {
    // Kakao sdk import
    const kakaoScript = document.createElement('script')
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    document.head.appendChild(kakaoScript)

    // Kakao sdk 스크립트 로드 완료시
    kakaoScript.onload = () => {
      window.Kakao.init('Kakao API KEY')
      window.Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: (auth) => {
          console.log('Kakao 로그인 완료', auth)
          // Kakao 로그인 성공시, 사용자정보 API 호출
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: (res) => {
              console.log('Kakao 사용자 정보', res)
            },
            fail: (err) => {
              console.log(err)
            },
          })
        },
        fail: (err) => {
          console.log(err)
        },
      })
    }
  }
  render() {
    return <button type="button" id="kakao-login-btn"></button>
  }
}

export default KakaoLogin
