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
const GET_PROFILE_INFO = 'GET_PROFILE_INFO'
const SET_LOGIN = 'SET_LOGIN'

// const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getUser = createAction(GET_USER, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))
const getProfileInfo = createAction(GET_PROFILE_INFO, (profile) => ({ profile }))
const setLogin = createAction(SET_LOGIN, (user_info) => ({ user_info }))

const initialState = {
  user: null,
  is_login: false,
  profile: null,
  user_info: null,
}

//middleware
const KakaoLogin = (KakaoCode) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: 'get',
      url: 'http://52.78.155.185/callback/kakao?code=' + `${KakaoCode}`,
    })
      .then((res) => {
        localStorage.setItem('token', res.data)
        console.log(res)
        history.replace('/')
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }
}

const joinDB = (username, nickname, password, passwordCheck) => {
  return function (dispatch, getState, { history }) {
    userApi
      .join(username, nickname, password, passwordCheck)
      .then((res) => {
        history.push('/login')
        swal('회원가입을 축하드립니다! 로그인 후 이용하실 수 있어요')
      })
      .catch((err) => {
        swal('이미 등록된 사용자 입니다! 아이디 또는 닉네임을 변경해주세요')
      })
  }
}

const logInDB = (username, password) => {
  return function (dispatch, getState, { history }) {
    userApi
      .login(username, password)
      .then((res) => {
        console.log(res)
        setCookie('token', res.headers.authorization, 3)
        localStorage.setItem('username', res.data.data.username)
        localStorage.setItem('nickname', res.data.data.nickname)
        localStorage.setItem('id', res.data.data.userId)
        dispatch(setUser({ username: res.data.data.username, nickname: res.data.data.nickname }))
        history.replace('/')
      })
      .catch((err) => {
        swal('잘못된 아이디나 비밀번호 입니다. 다시 확인해주세요!')
      })
  }
}

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie('token')
    localStorage.removeItem('username')
    localStorage.removeItem('nickname')
    localStorage.removeItem('id')
    dispatch(logOut())

    history.replace('/')
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

const getProfileInfoDB = () => {
  return async function (dispatch, getState, { history }) {
    await userApi
      .getProfileInfo()
      .then((response) => {
        const profile = response.data.data
        dispatch(getProfileInfo(profile))
      })
      .catch((error) => {
        console.log('프로필 정보를 불러오는 데 문제가 발생했습니다.', error.response)
      })
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
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null
        draft.is_login = false
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [GET_PROFILE_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.profile = action.payload.profile
      }),
    [SET_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.user_info
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
  KakaoLogin,
  getProfileInfo,
  getProfileInfoDB,
  setLogin,
}

export { actionCreators }
