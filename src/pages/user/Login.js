import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import '../../styles/css/Login.css'
import styled from 'styled-components'
import swal from 'sweetalert'
import { actionCreators as userActions } from '../../redux/modules/user'
import KaKaoLogin from 'react-kakao-login'
import KakaoButton from '../../components/KakaoLogin'
import GoogleButton from '../../components/GoogleLogin'
import NaverButton from '../../components/NaverLogin'
import kakaotalk from '../../styles/image/kakaotalk.svg'
import naver from '../../styles/image/naver.svg'
import googleColor from '../../styles/image/google_color.svg'
import Footer from '../../components/Footer'
import MemegleIcon from '../../styles/image/smileIcon_Yellow.png'
import Grid from '../../elements/Grid'

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
      setUsernameMessage('영문+숫자 3~16자')
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
      setPasswordMessage('숫자+영문+특수문자 조합으로 6~16자')
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
      <Grid flex_center padding="40px 0 37px">
        <Logo src={MemegleIcon} />
      </Grid>
      <div className="LoginLayout">
        <div className="MultiInputBoxLayout_login">
          <div className="LoginOrJoinButtons_login">
            <div className="JoinButton_login" onClick={() => history.push('/join')}>
              회원가입
            </div>
            <div className="LoginButton_login">로그인</div>
          </div>
          <div className="LoginOrJoinInputs_login">
            <label className="IdInputLabel" for="IdInput">
              아이디
            </label>
            <input className="IdInputBox" id="IdInput" placeholder="영어, 숫자 3~16자" maxLength="16" type="email" typeName="email" onChange={onChangeUsername} value={username} />
            <label className="PwdInputLabel" for="PwdInput">
              비밀번호
            </label>
            <input
              className="PwdInputBox"
              id="PwdInput"
              placeholder="영어 대소문자, 숫자, 특수문자 6~16자"
              maxLength="16"
              type="password"
              typeName="password"
              onChange={onChangePassword}
              value={password}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login()
                }
              }}
            />
            <div
              className="MemegleButton_LoginSubmit"
              type="submit"
              disabled={!(isUsername && isPassword)}
              onClick={login}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login()
                }
              }}
            >
              <button className="MemegleButton_LoginSubmit Login1">로그인</button>
              <div className="MemegleButton_LoginSubmit Login2"></div>
            </div>
          </div>
        </div>
        {/* <div className="SocialLoginHR">또는</div>
        <div className="SocialLoginBtns">
          <KakaoButton />
          <GoogleButton />
          <NaverButton />
        </div> */}
      </div>
      <Footer />
    </>
  )
}

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #111;
  /* cursor: pointer; */
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

export default Login
