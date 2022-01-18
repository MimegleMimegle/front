import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import '../../styles/css/Login.css'
import styled from 'styled-components'
import swal from 'sweetalert'
import { actionCreators as userActions } from '../../redux/modules/user'
import KaKaoLogin from 'react-kakao-login'
import GoogleButton from '../../components/GoogleLogin'
import NaverLogin from '../../components/NaverLogin'
import kakaotalk from '../../styles/image/kakaotalk.svg'
import naver from '../../styles/image/naver.svg'
import googleColor from '../../styles/image/google_color.svg'
import Footer from '../../components/Footer'
import MemegleIcon from '../../styles/image/smileIcon_Yellow.png'
import Grid from '../../elements/Grid'
import AlertModal from '../../components/modal/AlertModal'
import CircularProgress from '@mui/material/CircularProgress'

const Login = (props) => {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.user.is_loading)
  const loginFail = useSelector((state) => state.user.is_failure)
  console.log(loginFail)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameMessage, setUsernameMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [isUsername, setIsUsername] = useState('false')
  const [isPassword, setIsPassword] = useState('false')

  const [showAlert, setShowAlert] = useState(false)
  const [showFailAlert, setShowFailAlert] = useState(false)

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
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
      return
    }
    dispatch(userActions.logInDB(username, password))
  }

  useEffect(() => {
    if (loginFail) {
      setShowFailAlert(true)
      setTimeout(() => setShowFailAlert(false), 2000)
      dispatch(userActions.failLogin(false))
      dispatch(userActions.loading(false))
    }
  }, [loginFail])

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
              <button className="MemegleButton_LoginSubmit Login1" disabled={loading}>
                {loading ? <CircularProgress size={16} sx={{ color: '#FFFFFF' }} /> : '로그인'}
              </button>
              <div className="MemegleButton_LoginSubmit Login2"></div>
            </div>
          </div>
        </div>
        <div className="SocialLoginHR">또는</div>
        <div className="SocialLoginBtns">
          <a href="https://kauth.kakao.com/oauth/authorize?client_id=316b336d315dff9b64eaa117a37ee25b&redirect_uri=http://localhost:3000/*TODO*/&response_type=code">
            <img className="KakaoLoginBtn" size="5" src={kakaotalk}></img>
          </a>
          <GoogleButton />
          {/* <img className="GoogleLoginBtn" size="5" src={googleColor}></img> */}
          <NaverLogin />
          {/* <img className="NaverLoginBtn" size="5" src={naver}></img> */}
        </div>
      </div>
      <AlertModal showModal={showAlert}>
        <AlertText>아이디와 비밀번호를 모두 입력해주세요!</AlertText>
      </AlertModal>
      <AlertModal showModal={showFailAlert}>
        <AlertText>
          아이디 또는 비밀번호가 잘못되었습니다.
          <br />
          다시 확인해주세요!
        </AlertText>
      </AlertModal>
      <Footer />
    </>
  )
}

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #111;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

const AlertText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`

export default Login
