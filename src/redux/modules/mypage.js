import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { mypageApi } from '../../shared/api'

/* action type */

const GET_MYPAGE_DATA = 'GET_MYPAGE_DATA'
const GET_USER_PROFILE = 'GET_USER_PROFILE'
const EDIT_PROFILE_IMAGE = 'EDIT_PROFILE_IMAGE'
const EDIT_NICKNAME = 'EDIT_NICKNAME'

/* action creator */

const getMypageData = createAction(GET_MYPAGE_DATA, (myPageData) => ({ myPageData }))
const getUserProfile = createAction(GET_USER_PROFILE, (profileData) => ({ profileData }))
const editProfileImage = createAction(EDIT_PROFILE_IMAGE, (newProfileImageUrl) => ({ newProfileImageUrl }))
const editNickname = createAction(EDIT_NICKNAME, (newNickname) => ({ newNickname }))

/* initial state */

const initialState = {
  myPageData: null,
  myDictList: [],
  myQuestionList: [],
  myImageList: [],
  myProfile: null,
}

/* middleware */

const getMypageDataDB = () => {
  return async function (dispatch, getState, { history }) {
    await mypageApi
      .getMypageData()
      .then((response) => {
        const myPageData = response.data.data
        dispatch(getMypageData(myPageData))
      })
      .catch((error) => {
        console.log('마이 페이지 정보를 불러오는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const getUserProfileDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await mypageApi.getProfileInfo()
      const profileData = data.data
      dispatch(getUserProfile(profileData))
    } catch (error) {
      console.log('프로필 정보 조회 문제 발생', error.response)
    }
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
    [GET_MYPAGE_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.myPageData = action.payload.myPageData
        draft.myDictList = action.payload.myPageData.dict
        draft.myQuestionList = action.payload.myPageData.question
        draft.myImageList = action.payload.myPageData.postBoards.filter((post) => post.category === 'IMAGEBOARD')
      }),
    [GET_USER_PROFILE]: (state, action) =>
      produce(state, (draft) => {
        draft.myProfile = action.payload.profileData
      }),
    [EDIT_PROFILE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.myProfile = { ...draft.myProfile, profileImageUrl: action.payload.newProfileImageUrl }
        draft.myPageData = { ...draft.myPageData, profileImageUrl: action.payload.newProfileImageUrl }
      }),
    [EDIT_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.myProfile = { ...draft.myProfile, nickname: action.payload.newNickname }
        draft.myPageData = { ...draft.myPageData, nickname: action.payload.newNickname }
      }),
  },
  initialState
)

/* export */
const actionCreators = {
  getMypageData,
  getMypageDataDB,
  getUserProfile,
  getUserProfileDB,
  editProfileImage,
  editProfileImageDB,
  editNickname,
  editNicknameDB,
}

export { actionCreators }
