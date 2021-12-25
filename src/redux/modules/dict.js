import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { dictApi } from '../../shared/api'
import axios from 'axios'
import swal from 'sweetalert'

/* action type */
const GET_DICT_MAIN = 'GET_DICT_MAIN'
const GET_DICT_DETAIL = 'GET_DICT_DETAIL'
const ADD_DICT = 'ADD_DICT'
const EDIT_DICT = 'EDIT_DICT'
const DELETE_DICT = 'DELETE_DICT'
const DICT_CREATED_AT = 'DICT_CREATED_AT'
const DICT_IS_LIKE = 'DICT_IS_LIKE'
const GET_DICT_HISTORY = 'GET_DICT_HISTORY'
const GET_DICT_HISTORY_DETAIL = 'GET_DICT_HISTORY_DETAIL'
const ROLLBACK_ONE_DICT = 'ROLLBACK_ONE_DICT'
const LOADING = 'LOADING'

/* action creator */
const getDictMain = createAction(GET_DICT_MAIN, (dict_list) => dict_list)
const getDictDetail = createAction(GET_DICT_DETAIL, (dict_list) => dict_list)
const addDict = createAction(ADD_DICT, (dict_list) => ({ dict_list }))
const editDict = createAction(EDIT_DICT, (dict_id, dict) => ({ dict_id }))
const deleteDict = createAction(DELETE_DICT, (dict_id, dict) => ({ dict_id }))
const dictCreatedAt = createAction(DICT_CREATED_AT)
const dictIsLike = createAction(DICT_IS_LIKE, (dict_id) => ({ dict_id }))
const getDictHistory = createAction(GET_DICT_HISTORY)
const getDictHistoryDetail = createAction(GET_DICT_HISTORY_DETAIL)
const rollbackOneDict = createAction(ROLLBACK_ONE_DICT)
const loading = createAction(LOADING, (loading) => loading)

/* initial state */
const initialState = {
  list: [],
  loading: false,
}

/* middleware */
const getDictMainDB = () => {
  return function (dispatch, getState, { history }) {
    dictApi
      .getDictMain()
      .then((res) => {
        const dict_list = [...res.data]
        dispatch(getDictMain(dict_list))
      })
      .catch((err) => {
        if (err.res) {
          console.log(err.res.data)
          console.log(err.res.status)
          console.log(err.res.headers)
        }
      })
  }
}

const getDictDetailDB = (dictId) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true))
    dictApi
      .getDictDetail(dictId)
      .then((res) => {
        const dict_list = [...res.data.dict]
        dispatch(loading(false))
      })
      .catch((err) => console.log(err))
  }
}

const addDictDB = (title, content) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem('token')
    let formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)

    const DB = {
      method: 'post',
      url: `http://52.78.155.185/api/dict`,
      data: formData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    axios(DB)
      .then(() => {
        swal('', '성공적으로 등록되었습니다', 'success')
        history.push('/api/dict?page=0&size=10')
      })
      .catch((err) => {
        if (err.response.status === 403) {
          swal('로그인 시간이 만료되었습니다. 다시 로그인해주세요')
          history.replace('/')
        }
      })
  }
}

const editDictDB = (dictId, title, content) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem('token')
    let formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)

    axios({
      method: 'put',
      url: `http://52.78.155.185/api/dict/${dictId}`,
      data: formData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        swal('', '게시글이 수정되었습니다.', 'success')
        history.push('/api/dict?page=0&size=10')
      })
      .catch((err) => {
        if (err.response.status === 403) {
          swal('로그인 시간이 만료되었습니다. 다시 로그인해주세요')
          history.replace('/')
        }
      })
  }
}

const deleteDictDB = (dictId) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem('token')

    dictApi
      .deleteDict(dictId)
      .then((res) => {
        history.push('/api/dict?page=0&size=10')
      })
      .catch((err) => {
        if (err.res.status === 403) {
          swal('로그인 시간이 만료되었습니다. 다시 로그인해주세요')
        }
        history.replace('/')
      })
  }
}

/* reducer */
export default handleActions(
  {
    [GET_DICT_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [GET_DICT_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list = action.payload
      }),
    [ADD_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [EDIT_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [DELETE_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [DICT_CREATED_AT]: (state, action) =>
      produce(state, (draft) => {
        draft.created_At = action.payload
      }),
    [DICT_IS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [GET_DICT_HISTORY]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [GET_DICT_HISTORY_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [ROLLBACK_ONE_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading
      }),
  },
  initialState
)

/* export */
const actionCreators = {
  getDictMain,
  getDictDetail,
  addDict,
  editDict,
  deleteDict,
  dictCreatedAt,
  dictIsLike,
  getDictHistory,
  getDictHistoryDetail,
  rollbackOneDict,
  getDictMainDB,
  getDictDetailDB,
  addDictDB,
  editDictDB,
  deleteDictDB,
}

export { actionCreators }
