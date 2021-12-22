import React, { useState, useRef } from 'react'
import '../../styles/css/Join.css'
import { useDispatch } from 'react-redux'
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

  // 이메일
  const onChangeUsername = (e) => {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const usernameCurrent = e.target.value
    setUsername(usernameCurrent)

    if (!emailRegex.test(usernameCurrent)) {
      setUsernameMessage('이메일 형식을 확인해주세요.')
      setIsUsername(false)
    } else {
      setUsernameMessage('올바른 이메일 형식입니다')
      setIsUsername(true)
    }
  }

  // 이름
  const onChangeNickname = (e) => {
    setNickname(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 11) {
      setNicknameMessage('2글자 이상 11글자 미만으로 입력해주세요.')
      setIsNickname(false)
    } else {
      setNicknameMessage('올바른 이름 형식입니다')
      setIsNickname(true)
    }
  }

  // 비밀번호
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호입니다')
      setIsPassword(true)
    }
  }

  // 비밀번호 확인
  const onChangePasswordCheck = (e) => {
    const PasswordCheckCurrent = e.target.value
    setPasswordCheck(PasswordCheckCurrent)

    if (password === PasswordCheckCurrent) {
      setPasswordCheckMessage('비밀번호가 일치합니다')
      setIsPasswordCheck(true)
    } else {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.')
      setIsPasswordCheck(false)
    }
  }

  const join = () => {
    if (username === '' || nickname === '' || password === '' || passwordCheck === '') {
      window.alert('모두 입력해주세요!')
      return
    }

    // let userFormData = new FormData()

    // const data = {
    //   username: username,
    //   nickname: nickname,
    //   password: password,
    //   passwordCheck: passwordCheck,
    // }

    // userFormData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))

    dispatch(userActions.joinDB(username, nickname, password, passwordCheck))
  }

  return (
    <>
      <div className="JoinPageLayout">
        <text className="JoinText">회원가입</text>
        {/* <form> */}
        <div className="JoinInputTag">
          <input className="JoinInputBox" placeholder="아이디" type="text" value={username} onChange={onChangeUsername} />
          {username.length > 0 && <Span className={`message ${isUsername ? 'success' : 'error'}`}>{usernameMessage}</Span>}
        </div>
        <div className="JoinInputTag">
          <input className="JoinInputBox" maxLength="10" placeholder="닉네임" text="이름" type="text" value={nickname} onChange={onChangeNickname} />
          {nickname.length > 0 && <Span className={`message ${isNickname ? 'success' : 'error'}`}>{nicknameMessage}</Span>}
        </div>
        <div className="JoinInputTag">
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
        </div>
        <div className="JoinInputTag">
          <input className="JoinInputBox" type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} passwordText=" " title="비밀번호 확인" value={passwordCheck} />
          {setPasswordCheck.length > 0 && <Span className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{passwordCheckMessage}</Span>}
        </div>
        <button className="JoinButton" type="submit" disabled={!(isNickname && isUsername && isPassword && isPasswordCheck)} onClick={join}>
          회원가입하기
        </button>
        {/* </form> */}
      </div>
    </>
  )
}

const Span = styled.span`
  font-size: 12px;
  color: #ffa07a;
`
export default Join
