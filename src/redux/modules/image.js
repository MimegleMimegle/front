import { handleActions, createAction } from 'redux-actions'
import { produce } from 'immer'
import { imageApi } from '../../shared/api'

/* action type */
const GET_IMAGE_LIST = 'GET_IMAGE_LIST'
const GET_IMAGE_DETAIL = 'GET_IMAGE_DETAIL'
const UPLOAD_IMAGE = 'UPLOAD_IMAGE'
const DELETE_IMAGE = 'DELETE_IMAGE'
const LOADING = 'LOADING'
const INIT_IMAGE_LIST = 'INIT_IMAGE_LIST'

/* action creator */
const getImageList = createAction(GET_IMAGE_LIST, (image_data) => ({ image_data }))
const getImageDetail = createAction(GET_IMAGE_DETAIL, (image) => ({ image }))
const uploadImage = createAction(UPLOAD_IMAGE, (image) => ({ image }))
const deleteImage = createAction(DELETE_IMAGE, (boardId) => ({ boardId }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))
const initImageList = createAction(INIT_IMAGE_LIST, () => ({}))

/* initial state */
const initialState = {
  image_list: [],
  page: 0,
  has_next: false,
  is_loading: false,
}

/* middleware */
const getImageListDB = (page) => {
  return async function (dispatch, getState, { history }) {
    const size = 13
    dispatch(loading(true))
    await imageApi
      .getImageList(page, size)
      .then((response) => {
        let is_next = null
        if (response.data.data.length < 13) {
          is_next = false
        } else {
          response.data.data.pop()
          is_next = true
        }
        const image_data = {
          image_list: response.data.data,
          page: page + 1,
          next: is_next,
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
        const image = response.data.data
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
        const image = response.data.data
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
        draft.image_list.push(...action.payload.image_data.image_list)
        draft.page = action.payload.image_data.page
        draft.has_next = action.payload.image_data.next
        draft.is_loading = false
      }),
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_list.unshift(action.payload.image)
      }),
    [DELETE_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_list = action.payload
      }),
    [INIT_IMAGE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.image_list = []
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
  initImageList,
}

export { actionCreators }
