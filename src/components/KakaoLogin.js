import React, { Component } from 'react'

class KakaoButton extends Component {
  componentDidMount() {
    // Kakao sdk import
    const kakaoScript = document.createElement('script')
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
    document.head.appendChild(kakaoScript)

    // Kakao sdk 스크립트 로드 완료시
    kakaoScript.onload = () => {
      window.Kakao.init('96a19735de948eb6ddb3bfcc34fb2f78')
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
    return <button type="submit" id="kakao-login-btn"></button>
  }
}

export default KakaoButton
