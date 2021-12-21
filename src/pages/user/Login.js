import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import history from '../../redux/ConfigureStore'
import './Login.css'
import styled from 'styled-components'
import { actionCreators as userActions } from '../../redux/modules/user'
import KaKaoLogin from 'react-kakao-login'
import kakaotalk from '../../styles/image/kakaotalk.svg'
import naver from '../../styles/image/naver.svg'
import googleColor from '../../styles/image/google_color.svg'

const Login = (props) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [isUsername, setIsUsername] = useState('false')
  const [isPassword, setIsPassword] = useState('false')

  const onChangeUsername = (e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const usernameCurrent = e.target.value
    setUsername(usernameCurrent)

    if (!emailRegex.test(usernameCurrent)) {
      setEmailMessage('이메일 형식을 확인해주세요.')
      setIsUsername(false)
    } else {
      setEmailMessage('올바른 이메일 형식입니다')
      setIsUsername(true)
    }
  }

  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.')
      setIsPassword(false)
    } else {
      setPasswordMessage('올바른 비밀번호입니다')
      setIsPassword(true)
    }
  }

  const login = () => {
    if (username === '' || password === '') {
      window.alert('아이디, 비밀번호를 입력해주세요!')
      return
    }
    dispatch(userActions.logInDB({ username, password }))
  }

  return (
    <>
      <div className="LoginLayout">
        <text className="LoginText">로그인</text>
        <input className="IdInputBox" placeholder="아이디를 입력해주세요" type="email" typeName="email" onChange={onChangeUsername} />
        {username.length > 0 && <Span className={`message ${isUsername ? 'success' : 'error'}`}>{emailMessage}</Span>}
        <input className="PwdInputBox" placeholder="비밀번호를 입력해주세요" type="password" typeName="password" onChange={onChangePassword} />
        {password.length > 0 && <Span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</Span>}
        <button
          className="LoginButton"
          type="submit"
          // disabled={!(isUsername && isPassword)}
          onClick={login}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              console.log('Enter')
            }
          }}
        >
          로그인 하기
        </button>
        <text
          type="button"
          className="JoinNewUser"
          onClick={() => {
            history.push('/join')
          }}
        >
          아직 회원이 아니신가요?
        </text>
        <text className="FindUserPwd">비밀번호를 잊어버리셨나요?</text>
        <div className="SocialLoginHR">SNS 계정으로 로그인하기</div>
        <div className="SocialLoginBtns">
          <img className="KakaoLoginBtn" size="5" src={kakaotalk} token="96a19735de948eb6ddb3bfcc34fb2f78" buttonText="kakao" onFail={console.error} onLogout={console.info}></img>
          <img className="GoogleLoginBtn" size="5" src={googleColor}></img>
          <img className="NaverLoginBtn" size="5" src={naver}></img>
        </div>
      </div>
    </>
  )
}

const Span = styled.span`
  font-size: 13px;
  color: #ffa07a;
`

export default Login
