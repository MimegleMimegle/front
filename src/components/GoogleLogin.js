import React from 'react'
import GoogleLogin from 'react-google-login'

const clientId = process.env.REACT_APP_GOOGLE_API_KEY

export default function GoogleButton({ onSocial }) {
  const onSuccess = async (response) => {
    console.log(response)
    console.log(response.profileObj.email)
    console.log(response.profileObj.name)

    const {
      googleId,
      profileObj: { email, name },
    } = response

    // await onSocial({
    //   socialId: googleId,
    //   socialType: 'google',
    //   email,
    //   nickname: name,
    // })
  }

  const onFailure = (error) => {
    console.log(error)
  }

  return (
    <div>
      <GoogleLogin clientId={clientId} onSuccess={onSuccess} onFailure={onFailure} />
      {/* <GoogleLogin clientId={clientId} responseType={'id_token'} onSuccess={onSuccess} onFailure={onFailure} /> */}
    </div>
  )
}
