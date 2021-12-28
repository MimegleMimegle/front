import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { mypageApi } from '../../shared/api'

/* action type */

const GET_USER_INFO = 'GET_USER_INFO'
const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE'
const EDIT_NICKNAME = 'EDIT_NICKNAME'

/* action creator */

const getUserInfo = createAction(GET_USER_INFO, (user_info) => ({ user_info }))
const editProfileImage = createAction(EDIT_PROFILE_IMAGE, (newProfileImageUrl) => ({ newProfileImageUrl }))
const editNickname = createAction(EDIT_NICKNAME, (newNickname) => ({ newNickname }))

/* initial state */

const initialState = {
  user_info: null,
}

/* middleware */

const getUserInfoDB = (userId) => {
  return async function (dispatch, getState, { history }) {
    if (!userId) {
      return
    }

    await mypageApi
      .getUserInfo()
      .then((response) => {
        console.log(response.data)
        const user_info = response.data
        console.log(user_info)
        dispatch(getUserInfo(user_info))
      })
      .catch((error) => {
        console.log('마이 페이지 정보를 불러오는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const editProfileImageDB = (userId, uploadFile) => {
  return async function (dispatch, getState, { history }) {
    if (!userId) {
      return
    }

    const formData = new FormData()

    formData.append('images', uploadFile)

    await mypageApi
      .editProfileImage(formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        const newProfileImageUrl = response.data
        console.log(newProfileImageUrl)
        dispatch(editProfileImage(newProfileImageUrl))
      })
      .catch((error) => {
        console.log('프로필 이미지를 변경하는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const editNicknameDB = (userId, newNickname) => {
  return async function (dispatch, getState, { history }) {
    if (!userId) {
      return
    }

    await mypageApi
      .editNickname(newNickname)
      .then((response) => {
        console.log(response.data)
        dispatch(editNickname(newNickname))
      })
      .catch((error) => {
        console.log('닉네임을 변경하는 데 문제가 발생했습니다.', error.response)
      })
  }
}

/* reducer */

export default handleActions(
  {
    [GET_USER_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.user_info
      }),
    [EDIT_PROFILE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = { ...draft.user_info, profileImageUrl: action.payload.newProfileImageUrl }
      }),
    [EDIT_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = { ...draft.user_info, nickname: action.payload.newNickname }
      }),
  },
  initialState
)

/* export */
const actionCreators = {
  getUserInfo,
  getUserInfoDB,
  editProfileImage,
  editProfileImageDB,
  editNickname,
  editNicknameDB,
}

export { actionCreators }
