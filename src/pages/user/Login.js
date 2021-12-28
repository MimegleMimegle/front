import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import '../../styles/css/Login.css'
import styled from 'styled-components'
import swal from 'sweetalert'
import { actionCreators as userActions } from '../../redux/modules/user'
import KaKaoLogin from 'react-kakao-login'
import kakaotalk from '../../styles/image/kakaotalk.svg'
import naver from '../../styles/image/naver.svg'
import googleColor from '../../styles/image/google_color.svg'

const Login = (props) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameMessage, setUsernameMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [isUsername, setIsUsername] = useState('false')
  const [isPassword, setIsPassword] = useState('false')

  const onChangeUsername = (e) => {
    const emailRegex = /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/
    const usernameCurrent = e.target.value
    setUsername(usernameCurrent)

    if (!emailRegex.test(usernameCurrent)) {
      setUsernameMessage('영문자와 숫자로 이루어진 3자 이상 16자 이하')
      setIsUsername(false)
    } else {
      setUsernameMessage('올바른 형식입니다')
      setIsUsername(true)
    }
  }

  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 6자리 이상 입력해주세요')
      setIsPassword(false)
    } else {
      setPasswordMessage('올바른 비밀번호입니다')
      setIsPassword(true)
    }
  }

  const login = () => {
    if (username === '' || password === '') {
      swal('아이디, 비밀번호를 입력해주세요!')
      return
    }
    dispatch(userActions.logInDB(username, password))
  }
  return (
    <>
      <div className="LoginLayout">
        <div className="MultiInputBoxLayout_login">
          <div className="LoginOrJoinButtons_login">
            <div className="LoginButton_login">로그인</div>
            <div className="JoinButton_login" onClick={() => history.push('/join')}>
              회원가입
            </div>
          </div>
          <div className="LoginOrJoinInputs_login">
            <input className="IdInputBox" placeholder="아이디를 입력해주세요" type="email" typeName="email" onChange={onChangeUsername} value={username} />
            {username.length > 0 && <Span className={`message ${isUsername ? 'success' : 'error'}`}>{usernameMessage}</Span>}
            <input className="PwdInputBox" placeholder="비밀번호를 입력해주세요" type="password" typeName="password" onChange={onChangePassword} value={password} />
            {password.length > 0 && <Span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</Span>}
            <button
              className="LoginSubmitButton"
              type="submit"
              disabled={!(isUsername && isPassword)}
              onClick={login}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  console.log('Enter')
                }
              }}
            >
              로그인 하기
            </button>
          </div>
          <div className="SocialLoginHR">SNS 계정으로 로그인하기</div>
          <div className="SocialLoginBtns">
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=316b336d315dff9b64eaa117a37ee25b&redirect_uri=http://localhost:3000/*TODO*/&response_type=code">
              <img className="KakaoLoginBtn" size="5" src={kakaotalk}></img>
            </a>
            <img className="GoogleLoginBtn" size="5" src={googleColor}></img>
            <img className="NaverLoginBtn" size="5" src={naver}></img>
          </div>
        </div>
      </div>
    </>
  )
}

const Span = styled.span`
  font-size: 12px;
  color: #ffa07a;
`

export default Login
