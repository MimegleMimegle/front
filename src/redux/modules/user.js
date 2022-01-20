import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { setCookie, deleteCookie } from '../../shared/cookie'
import { applyMiddleware } from 'redux'
import axios from 'axios'
import { userApi } from '../../shared/api'
import swal from 'sweetalert'

const { Kakao } = window

const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'
const SET_LOGIN = 'SET_LOGIN'
const INIT_FIRST_LOGIN = 'SET_FIRST_LOGIN'
const LOADING = 'LOADING'
const FAIL_LOGIN = 'FAIL_LOGIN'

// const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getUser = createAction(GET_USER, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))
const setLogin = createAction(SET_LOGIN, (user_info) => ({ user_info }))
const initFirstLogin = createAction(INIT_FIRST_LOGIN, (init) => ({ init }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))
const failLogin = createAction(FAIL_LOGIN, (is_failure) => ({ is_failure }))

const initialState = {
  user: null,
  is_login: false,
  user_info: null,
  is_first: false,
  is_loading: false,
  is_failure: false,
}

//middleware
const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    userApi
      .KakaoLogin(code)
      .then((res) => {
        console.log(res) // 토큰이 넘어올 것임

        const ACCESS_TOKEN = res.data.accessToken

        localStorage.setItem('token', ACCESS_TOKEN) //예시로 로컬에 저장함

        history.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log('카카오로그인 에러', err)
        window.alert('로그인에 실패하였습니다.')
        history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
      })
  }
}

const naverLoginDB = (code, state) => {
  return function (dispatch, getState, { history }) {
    userApi
      .NaverLogin(code, state)
      .then((res) => {
        console.log(res) // 토큰이 넘어올 것임

        localStorage.setItem('token', res.headers.authorization)
        localStorage.setItem('nickname', res.data.data.nickname)

        dispatch(setUser({ nickname: res.data.data.nickname }))
        history.replace('/')
      })
      .catch((err) => {
        console.log('네이버로그인 에러', err)
        // window.alert('로그인에 실패하였습니다.')
        history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
      })
  }
}

const googleLogin = () => {
  return function (dispatch, getState, { history }) {
    userApi
      .GoogleLogin()
      .then((res) => {
        console.log(res) // 토큰이 넘어올 것임

        const ACCESS_TOKEN = res.data.accessToken

        localStorage.setItem('token', ACCESS_TOKEN) //예시로 로컬에 저장함

        history.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      })
      .catch((err) => {
        console.log('구글로그인 에러', err)
        window.alert('로그인에 실패하였습니다.')
        history.replace('/login') // 로그인 실패하면 로그인화면으로 돌려보냄
      })
  }
}

const joinDB = (username, nickname, password, passwordCheck) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true))
    userApi
      .join(username, nickname, password, passwordCheck)
      .then((res) => {
        history.push('/login')
      })
      .catch((err) => {
        swal('이미 등록된 사용자 입니다! 아이디 또는 닉네임을 변경해주세요')
      })
  }
}

const logInDB = (username, password) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true))
    userApi
      .login(username, password)
      .then((res) => {
        console.log(res)
        // setCookie('token', res.headers.authorization, 3)
        localStorage.setItem('token', res.headers.authorization)
        localStorage.setItem('username', res.data.data.username)
        localStorage.setItem('nickname', res.data.data.nickname)
        localStorage.setItem('id', res.data.data.userId)

        dispatch(setUser({ username: res.data.data.username, nickname: res.data.data.nickname }))
        history.replace('/')
      })
      .catch((err) => {
        console.log(err)
        dispatch(failLogin(true))
      })
  }
}

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    // deleteCookie('token')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('nickname')
    localStorage.removeItem('id')
    dispatch(logOut())
  }
}

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    const username = localStorage.getItem('username')
    const tokenCheck = document.cookie
    if (tokenCheck) {
      dispatch(setUser({ userId: username }))
    } else {
      dispatch(logOut())
    }
  }
}

const SetLogin = () => {
  return function (dispatch, getState, { history }) {
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('id')
    const token = document.cookie.split('=')[1]
    if (username !== null && token !== '') {
      dispatch(setLogin({ username: username, userId: userId }))
    }
  }
}

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
        draft.is_first = true
        draft.is_loading = false
        draft.is_failure = false
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null
        draft.is_login = false
        draft.is_loading = false
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
        draft.is_loading = false
      }),
    [SET_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.user_info
      }),
    [INIT_FIRST_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_first = false
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading
      }),
    [FAIL_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.is_failure = action.payload.is_failure
        draft.is_loading = false
      }),
  },
  initialState
)

const actionCreators = {
  setUser,
  logOut,
  getUser,
  joinDB,
  logInDB,
  logOutDB,
  loginCheckDB,
  kakaoLogin,
  naverLoginDB,
  googleLogin,
  setLogin,
  SetLogin,
  initFirstLogin,
  loading,
  failLogin,
}

export { actionCreators }
