import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { mypageApi } from '../../shared/api'

/* action type */

const GET_USER_INFO = 'GET_USER_INFO'
const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE'
const EDIT_NICKNAME = 'EDIT_NICKNAME'

/* action creator */

const getUserInfo = createAction(GET_USER_INFO, (myPageData) => ({ myPageData }))
const editProfileImage = createAction(EDIT_PROFILE_IMAGE, (newProfileImageUrl) => ({ newProfileImageUrl }))
const editNickname = createAction(EDIT_NICKNAME, (newNickname) => ({ newNickname }))

/* initial state */

const initialState = {
  myPageData: null,
  myDictList: [],
  myPostList: [],
  myImageList: [],
}

/* middleware */

const getUserInfoDB = () => {
  return async function (dispatch, getState, { history }) {
    await mypageApi
      .getUserInfo()
      .then((response) => {
        const myPageData = response.data.data
        dispatch(getUserInfo(myPageData))
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
        const newProfileImageUrl = response.data.data.profileImageUrl
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
        draft.myPageData = action.payload.myPageData
        draft.myDictList = action.payload.myPageData.dict
        draft.myPostList = action.payload.myPageData.postBoards.filter((post) => post.category === 'FREEBOARD')
        draft.myImageList = action.payload.myPageData.postBoards.filter((post) => post.category === 'IMAGEBOARD')
      }),
    [EDIT_PROFILE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.myPageData = { ...draft.myPageData, profileImageUrl: action.payload.newProfileImageUrl }
      }),
    [EDIT_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.myPageData = { ...draft.myPageData, nickname: action.payload.newNickname }
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
