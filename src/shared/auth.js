import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

/**
 * Page 			: 해당 라우트에서 보여줄 페이지
 * checkAuth 	: 해당 라우트 AuthCheck 여부 (boolean)
 * return			: 해당 페이지와 react-router props(history, match, location)
 */

export default function (Page, checkAuth) {
  const AuthCheck = (props) => {
    const dispatch = useDispatch()
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token'))
      .split('=')[1]
    const username = localStorage.getItem('username')
    const isLoggedIn = username !== null && token !== undefined ? true : false

    useEffect(() => {
      dispatch(userActions.SetLogin())
      // 로그인을 하지 않았는데 로그인 필요한 페이지에 있을 경우
      if (!isLoggedIn && checkAuth) {
        window.alert('로그인이 필요합니다.')
        props.history.push('/login')
      }
      // 로그인을 이미 했는데 로그인 페이지 / 로그인 랜딩 페이지에 있을 경우 메인페이지로 이동
      else if (isLoggedIn && !checkAuth) {
        props.history.push('/')
      }
    }, [])

    return <Page {...props} />
  }
  return AuthCheck
}
