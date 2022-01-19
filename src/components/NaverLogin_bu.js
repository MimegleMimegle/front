import React from 'react'
import NaverLogin from 'react-naver-login'

const NaverButton = () => {
  return (
    <NaverLogin
      clientId="MqzRjEkh9y1dtldzuTse"
      callbackUrl="http://localhost:3000/login"
      render={(props) => <div onClick={props.onClick}>Naver Login</div>}
      onSuccess={(naverUser) => console.log(naverUser)}
      onFailure={() => console.error()}
    />
  )
}
export default NaverButton
