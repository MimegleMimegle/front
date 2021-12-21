import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { setCookie, deleteCookie } from '../../shared/cookie'
import { applyMiddleware } from 'redux'
import { userApi } from '../../shared/api'

const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'

// const logIn = createAction(LOG_IN, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const getUser = createAction(GET_USER, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))

const initialState = {
  user: null,
  is_login: false,
}

//middleware
const joinDB = (username, nickname, password, passwordCheck) => {
  return function (dispatch, getState, { history }) {
    userApi
      .join(username, nickname, password, passwordCheck)
      .then((res) => {
        console.log(res)
        history.push('/login')
        window.alert('회원가입을 축하드립니다! 로그인 후 이용하실 수 있어요')
      })
      .catch((err) => {
        console.log(err)
        window.alert('이미 등록된 사용자 입니다! 아이디 또는 닉네임을 변경해주세요')
      })
  }
}

const logInDB = (username, password) => {
  return function (dispatch, getState, { history }) {
    userApi
      .login(username, password)
      .then((res) => {
        setCookie('token', res.data.token, 3)
        localStorage.setItem('username', res.data.user.username)
        localStorage.setItem('nickname', res.data.user.nickname)
        dispatch(setUser({ username: res.data.user.username, nickname: res.data.user.nickname }))
        history.replace('/')
      })
      .catch((err) => {
        console.log(err)
        window.alert('잘못된 아이디나 비밀번호 입니다. 다시 확인해주세요!')
      })
  }
}

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie('token')
    localStorage.removeItem('username')
    localStorage.removeItem('nickname')
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
}

export { actionCreators }
