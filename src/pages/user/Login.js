import React from 'react'
import './Login.css'

import KakaoLoginBtn from '../../components/KakaoLoginBtn'
import MobileFrame from '../../components/MobileFrame'
import kakaotalk from '../../styles/image/kakaotalk.svg'
import google from '../../styles/image/google.svg'
import naver from '../../styles/image/naver.svg'
import googleColor from '../../styles/image/google_color.svg'

const Login = (props) => {
  return (
    <>
      <div className="LoginLayout">
        <text className="LoginText">로그인</text>
        <input className="IdInputBox" />
        <input className="PwdInputBox" />
        <text className="FindUserPwd">비밀번호를 잊어버리셨나요?</text>
        <div className="SocialLoginHR">SNS 계정으로 로그인하기</div>
        <div className="SocialLoginBtnOutline">
          <img className="KakaoLoginBtn" size="5" src={kakaotalk}></img>
        </div>
        <div className="SocialLoginBtnOutline">
          <img className="GoogleLoginBtn" size="5" src={googleColor}></img>
        </div>
        <div className="SocialLoginBtnOutline">
          <img className="NaverLoginBtn" size="5" src={naver}></img>
        </div>
      </div>
    </>
  )
}

export default Login
