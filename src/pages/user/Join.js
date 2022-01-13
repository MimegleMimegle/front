import React, { useState, useRef } from 'react'
import '../../styles/css/Join.css'
import { useDispatch } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import swal from 'sweetalert'
import { actionCreators as userActions } from '../../redux/modules/user'
import { userApi } from '../../shared/api'
import kakaotalk from '../../styles/image/kakaotalk.svg'
import naver from '../../styles/image/naver.svg'
import googleColor from '../../styles/image/google_color.svg'
import styled from 'styled-components'
import DoubleCheckModal from '../../components/modal/DoubleCheckModal'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const Join = () => {
  const dispatch = useDispatch()

  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [username, setUsername] = React.useState('')
  const [nickname, setNickname] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordCheck, setPasswordCheck] = React.useState('')

  //오류메시지 상태저장
  const [usernameMessage, setUsernameMessage] = useState('')
  const [nicknameMessage, setNicknameMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('')

  // 유효성 검사
  const [isUsername, setIsUsername] = useState(false)
  const [isNickname, setIsNickname] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordCheck, setIsPasswordCheck] = useState(false)

  // 아이디 & 닉네임 중복확인
  const [isUsernameChecked, setIsUsernameChecked] = useState(false)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)
  const [doubleCheck, setDoubleCheck] = useState(null)
  console.log(doubleCheck)

  // 유저네임 유효성 검사
  const onChangeUsername = (e) => {
    const emailRegex = /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/
    const usernameCurrent = e.target.value
    setUsername(usernameCurrent)

    if (!emailRegex.test(usernameCurrent)) {
      setUsernameMessage('영문+숫자 조합으로 3~16자가 맞는지 확인해주세요')
      setIsUsername(false)
    } else {
      setUsernameMessage('올바른 형식입니다')
      setIsUsername(true)
    }
  }

  // 닉네임 유효성 검사
  const onChangeNickname = (e) => {
    const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/
    const nicknameCurrent = e.target.value
    setNickname(nicknameCurrent)
    if (!nicknameRegex.test(nicknameCurrent)) {
      setNicknameMessage('영문+한글 조합으로 2~10자리가 맞는지 확인해주세요')
      setIsNickname(false)
    } else {
      setNicknameMessage('올바른 형식입니다')
      setIsNickname(true)
    }
  }

  // 비밀번호 유효성 검사
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문 조합으로 6~16자리가 맞는지 확인해주세요')
      setIsPassword(false)
    } else {
      setPasswordMessage('유효한 비밀번호입니다')
      setIsPassword(true)
    }
  }

  // 비밀번호 확인 유효성 검사
  const onChangePasswordCheck = (e) => {
    const PasswordCheckCurrent = e.target.value
    setPasswordCheck(PasswordCheckCurrent)

    if (password === PasswordCheckCurrent) {
      setPasswordCheckMessage('비밀번호가 일치합니다')
      setIsPasswordCheck(true)
    } else {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다')
      setIsPasswordCheck(false)
    }
  }

  const checkUsername = async () => {
    await userApi
      .checkUsername(username)
      .then((response) => {
        console.log(response.data)
        if (response.data.result === true) {
          // swal('사용 가능한 아이디입니다.')
          setDoubleCheck(true)
          setIsUsernameChecked(true)
        } else {
          // swal('사용 중인 아이디입니다.')
          setDoubleCheck(false)
          setIsUsernameChecked(false)
        }
      })
      .catch((error) => {
        console.log('아이디를 중복확인하는 데 문제가 발생했습니다.', error.response)
      })
  }

  const checkNickname = async () => {
    await userApi
      .checkNickname(nickname)
      .then((response) => {
        console.log(response.data)
        if (response.data.result === true) {
          // swal('사용 가능한 닉네임입니다.')
          setDoubleCheck(true)
          setIsNicknameChecked(true)
        } else {
          // swal('사용 중인 닉네임입니다.')
          setDoubleCheck(false)
          setIsNicknameChecked(false)
        }
      })
      .catch((error) => {
        console.log('닉네임을 중복확인하는 데 문제가 발생했습니다.', error.response)
      })
  }

  const join = () => {
    if (username === '' || nickname === '' || password === '' || passwordCheck === '') {
      swal('빈칸을 모두 입력해주세요!')
      return
    }
    dispatch(userActions.joinDB(username, nickname, password, passwordCheck))
  }

  return (
    <>
      <Header type="Join" noBorder></Header>
      <div className="JoinPageLayout">
        <div className="MultiInputBoxLayout_join">
          <div className="LoginOrJoinButtons_join">
            <div className="JoinButton_join"> 회원가입</div>
            <div className="LoginButton_join" onClick={() => history.push('/login')}>
              로그인
            </div>
          </div>
          <div className="LoginOrJoinInputs_join">
            <label className="JoinInputLabel_Username" for="UsernameInput_Join">
              아이디
            </label>
            <DoubleCheckBox>
              <input
                className="JoinInputBox input1"
                id="UsernameInput_Join"
                maxLength="16"
                placeholder="영어, 숫자 3~16자"
                type="text"
                value={username}
                onChange={onChangeUsername}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    checkUsername()
                  }
                }}
              />
              <button className="doubleCheckButton" onClick={checkUsername}>
                중복확인
              </button>
            </DoubleCheckBox>
            {username.length > 0 && <SpanUsername className={`message ${isUsername ? 'success' : 'error'}`}>{usernameMessage}</SpanUsername>}
            <label className="JoinInputLabel_Nickname" for="NicknameInput_Join">
              닉네임
            </label>
            <DoubleCheckBox>
              <input
                className="JoinInputBox input1"
                id="NicknameInput_Join"
                maxLength="10"
                placeholder="한글,영어 대소문자, 숫자 2~10자"
                text="이름"
                type="text"
                value={nickname}
                onChange={onChangeNickname}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    checkNickname()
                  }
                }}
              />
              <button className="doubleCheckButton" onClick={checkNickname}>
                중복확인
              </button>
            </DoubleCheckBox>
            {nickname.length > 0 && <SpanNickname className={`message ${isNickname ? 'success' : 'error'}`}>{nicknameMessage}</SpanNickname>}
            <label className="JoinInputLabel_Password" for="PasswordInput_Join">
              비밀번호
            </label>
            <input
              className="JoinInputBox input2"
              id="PasswordInput_Join"
              maxLength="16"
              type="password"
              placeholder="영어 대소문자, 숫자, 특수문자 6~16자"
              onChange={onChangePassword}
              passwordText="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
              title="비밀번호"
              value={password}
            />
            {password.length > 0 && <SpanPassword className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</SpanPassword>}
            <label className="JoinInputLabel_PasswordCheck" for="PasswordCheckInput_Join">
              비밀번호 확인
            </label>
            <input
              className="JoinInputBox input2"
              id="PasswordCheckInput_Join"
              maxLength="16"
              type="password"
              placeholder="영어 대소문자, 숫자, 특수문자 6~16자"
              onChange={onChangePasswordCheck}
              passwordText=" "
              title="비밀번호 확인"
              value={passwordCheck}
            />
            {setPasswordCheck.length > 0 && <SpanPasswordCheck className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{passwordCheckMessage}</SpanPasswordCheck>}
            <div
              className="MemegleButton_JoinSubmit"
              type="submit"
              disabled={!(isNickname && isUsername && isPassword && isPasswordCheck)}
              onClick={join}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  console.log('Enter')
                }
              }}
            >
              <button className="MemegleButton_JoinSubmit Join1">회원가입</button>
              <div className="MemegleButton_JoinSubmit Join2"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {doubleCheck === null && null}
      {doubleCheck === true && (
        <DoubleCheckModal title="사용 가능합니다." doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <ConfirmButton onClick={() => setDoubleCheck(null)}>확인</ConfirmButton>
        </DoubleCheckModal>
      )}
      {doubleCheck === false && (
        <DoubleCheckModal type="exist-onlyConfirm" title="사용 중입니다." doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <ConfirmButton onClick={() => setDoubleCheck(null)}>확인</ConfirmButton>
        </DoubleCheckModal>
      )}
    </>
  )
}

const DoubleCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 0 0 0;
`
const SpanUsername = styled.span`
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: -10px;
  color: #ffa07a;
`

const SpanNickname = styled.span`
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: -10px;
  color: #ffa07a;
`
const SpanPassword = styled.span`
  font-size: 12px;
  margin-bottom: -15px;
  color: #ffa07a;
`
const SpanPasswordCheck = styled.span`
  font-size: 12px;
  margin-bottom: -10px;
  color: #ffa07a;
`

const ConfirmButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default Join

{
  /* <div className="SocialLoginHR_JoinPage">또는</div> */
}
{
  /* <div className="SocialLoginBtns_JoinPage"> */
}
// <a href="https://kauth.kakao.com/oauth/authorize?client_id=316b336d315dff9b64eaa117a37ee25b&redirect_uri=http://localhost:3000/*TODO*/&response_type=code">
// <img className="KakaoLoginBtn_JoinPage" size="50" src={kakaotalk}></img>
// </a>
// <img className="GoogleLoginBtn_JoinPage" size="50" src={googleColor}></img>
// <img className="NaverLoginBtn_JoinPage" size="50" src={naver}></img>
// </div>
