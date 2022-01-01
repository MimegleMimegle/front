import { handleActions, createAction } from 'redux-actions'
import { produce } from 'immer'
import { imageApi } from '../../shared/api'

/* action type */
const GET_IMAGE_LIST = 'GET_IMAGE_LIST'
const GET_IMAGE_DETAIL = 'GET_IMAGE_DETAIL'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
const DELETE_IMAGE = 'DELETE_IMAGE'
const LOADING = 'LOADING'

/* action creator */
const getImageList = createAction(GET_IMAGE_LIST, (image_data) => ({ image_data }))
const getImageDetail = createAction(GET_IMAGE_DETAIL, (image) => ({ image }))
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }))
const deleteImage = createAction(DELETE_IMAGE, (boardId) => ({ boardId }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

/* initial state */
const initialState = {
  image_list: [],
  page: 0,
  has_next: false,
}

/* middleware */
const getImageListDB = () => {
  return async function (dispatch, getState, { history }) {
    const category = 'IMAGEBOARD'
    const page = 0
    const size = 12
    await imageApi
      .getImageList(category, page, size)
      .then((response) => {
        console.log(response.data)
        const image_data = {
          ...response.data,
          page: page + 10,
        }
        dispatch(getImageList(image_data))
      })
      .catch((error) => {
        console.log('이미지 리스트를 불러오는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const getImageDetailDB = (boardId) => {
  return async function (dispatch, getState, { history }) {
    if (!boardId) {
      return
    }
    await imageApi
      .getImageDetail(boardId)
      .then((response) => {
        console.log(response.data)
        const image = response.data.data
        console.log(image)
        dispatch(loading(false))
        dispatch(getImageDetail(image))
      })
      .catch((error) => {
        console.log('이미지 상세 정보를 불러오는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const uploadImageDB = (uploadFile) => {
  return async function (dispatch, getState, { history }) {
    console.log(uploadFile)
    const formData = new FormData()
    const category = 'IMAGEBOARD'
    const post = {
      title: 'IMAGEBOARD',
      content: 'IMAGEBOARD',
      hashTags: [],
    }

    formData.append('thumbNail', uploadFile)
    formData.append('boardUploadRequestDto', new Blob([JSON.stringify(post)], { type: 'application/json' }))

    await imageApi
      .uploadImage(category, formData)
      .then((response) => {
        console.log(response.data)
        const image = response.data.data
        console.log(image)
        dispatch(loading(false))
      })
      .then(() => {
        history.go('/image')
      })
      .catch((error) => {
        console.log('이미지를 업로드하는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const deleteImageDB = (boardId) => {
  return async function (dispatch, getState, { history }) {
    if (!boardId) {
      return
    }
    await imageApi
      .deleteImage(boardId)
      .then((response) => {
        console.log(response.data)
        dispatch(loading(false))
      })
      .then(() => {
        history.go('/image')
      })
      .catch((error) => {
        console.log('이미지를 삭제하는 데 문제가 발생했습니다.', error.response)
      })
  }
}

export default handleActions(
  {
    [GET_IMAGE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.image_list.push(...action.payload.image_data.data)
        draft.page = action.payload.image_data.page
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_list.unshift(action.payload.image)
      }),
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_list = action.payload
      }),
  },
  initialState
)

const actionCreators = {
  getImageList,
  getImageListDB,
  getImageDetail,
  getImageDetailDB,
  uploadImage,
  uploadImageDB,
  deleteImage,
  deleteImageDB,
}

export { actionCreators }
