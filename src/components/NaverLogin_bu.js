import React from 'react'
import NaverLogin from 'react-naver-login'
import { ReactComponent as NaverLogo } from '../styles/image/naver.svg'

const NaverButton = () => {
  return (
    <>
      <NaverLogin
        clientId="MqzRjEkh9y1dtldzuTse"
        callbackUrl="http://localhost:3000/login"
        render={(props) => <div onClick={props.onClick}>네이버 로그인</div>}
        onSuccess={(naverUser) => console.log(naverUser)}
        onFailure={() => console.error()}
      />
    </>
  )
}
export default NaverButton
