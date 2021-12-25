import React, { useState, useRef } from 'react'
import '../../styles/css/Join.css'
import { useDispatch } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as userActions } from '../../redux/modules/user'

import styled from 'styled-components'

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
  const [isUsername, setIsUsername] = useState('false')
  const [isNickname, setIsNickname] = useState('false')
  const [isPassword, setIsPassword] = useState('false')
  const [isPasswordCheck, setIsPasswordCheck] = useState('false')

  // 유저네임 유효성 검사
  const onChangeUsername = (e) => {
    const emailRegex = /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/
    const usernameCurrent = e.target.value
    setUsername(usernameCurrent)

    if (!emailRegex.test(usernameCurrent)) {
      setUsernameMessage('영문자 + 숫자 조합으로 3자리 이상 16자리 이하인지 확인해주세요')
      setIsUsername(false)
    } else {
      setUsernameMessage('올바른 형식입니다')
      setIsUsername(true)
    }
  }

  // 닉네임 유효성 검사
  const onChangeNickname = (e) => {
    const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/
    const nicknameCurrent = e.target.value
    setNickname(nicknameCurrent)
    if (!nicknameRegex.test(nicknameCurrent)) {
      setNicknameMessage('영문자 또는 한글 조합으로 2자리 이상 16자리 이하가 맞는지 확인해주세요')
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
      setPasswordMessage('숫자+영문자 조합으로 6자리 이상 16자리 이하가 되도록 입력해주세요')
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

  const join = () => {
    if (username === '' || nickname === '' || password === '' || passwordCheck === '') {
      window.alert('모두 입력해주세요!')
      return
    }
    dispatch(userActions.joinDB(username, nickname, password, passwordCheck))
  }

  return (
    <>
      <div className="JoinPageLayout">
        <div className="MultiInputBoxLayout_join">
          <div className="LoginOrJoinButtons_join">
            <div className="LoginButton_join" onClick={() => history.push('/login')}>
              로그인
            </div>
            <div className="JoinButton_join">회원가입</div>
          </div>
          <div className="LoginOrJoinInputs_join">
            <input className="JoinInputBox" placeholder="아이디" type="text" value={username} onChange={onChangeUsername} />
            {username.length > 0 && <Span className={`message ${isUsername ? 'success' : 'error'}`}>{usernameMessage}</Span>}
            <input className="JoinInputBox" maxLength="10" placeholder="닉네임" text="이름" type="text" value={nickname} onChange={onChangeNickname} />
            {nickname.length > 0 && <Span className={`message ${isNickname ? 'success' : 'error'}`}>{nicknameMessage}</Span>}
            <input
              className="JoinInputBox"
              type="password"
              placeholder="비밀번호"
              onChange={onChangePassword}
              passwordText="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
              title="비밀번호"
              value={password}
            />
            {password.length > 0 && <Span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</Span>}
            <input className="JoinInputBox" type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} passwordText=" " title="비밀번호 확인" value={passwordCheck} />
            {setPasswordCheck.length > 0 && <Span className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{passwordCheckMessage}</Span>}
            <button
              className="JoinSubmitButton"
              type="submit"
              disabled={!(isNickname && isUsername && isPassword && isPasswordCheck)}
              onClick={join}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  console.log('Enter')
                }
              }}
            >
              회원가입하기
            </button>
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
export default Join
