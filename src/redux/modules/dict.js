import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { dictApi } from '../../shared/api'
import axios from 'axios'
import swal from 'sweetalert'
import { getCookie } from '../../shared/cookie'

/* action type */
const GET_DICT_MAIN = 'GET_DICT_MAIN'
const GET_DICT_DETAIL = 'GET_DICT_DETAIL'
const GET_TODAY_DICT_LIST = 'GET_TODAY_DICT_LIST'
const ADD_DICT = 'ADD_DICT'
const EDIT_DICT = 'EDIT_DICT'
const DELETE_DICT = 'DELETE_DICT'
const DICT_CREATED_AT = 'DICT_CREATED_AT'
const DICT_IS_LIKE = 'DICT_IS_LIKE'
const GET_DICT_HISTORY = 'GET_DICT_HISTORY'
const GET_DICT_HISTORY_DETAIL = 'GET_DICT_HISTORY_DETAIL'
const ROLLBACK_ONE_DICT = 'ROLLBACK_ONE_DICT'
const LOADING = 'LOADING'
const TELL_ME_TOTAL_LENGTH = 'TELL_ME_TOTAL_LENGTH'
const SEARCH_DICT = 'SEARCH_DICT'
const DOUBLE_CHECK_DICT = 'DOUBLE_CHECK_DICT'

/* action creator */
const getDictMain = createAction(GET_DICT_MAIN, (dict_list, paging) => ({ dict_list, paging }))
const getDictDetail = createAction(GET_DICT_DETAIL, (dict_list) => dict_list)
const getTodayDictList = createAction(GET_TODAY_DICT_LIST, (todayDict_list) => ({ todayDict_list }))
const addDict = createAction(ADD_DICT, (dict) => ({ dict }))
const editDict = createAction(EDIT_DICT, (dict_id, dict) => ({ dict_id }))
const deleteDict = createAction(DELETE_DICT, (dict_id, dict) => ({ dict_id }))
const dictCreatedAt = createAction(DICT_CREATED_AT)
const dictIsLike = createAction(DICT_IS_LIKE, (dict_id) => ({ dict_id }))
const getDictHistory = createAction(GET_DICT_HISTORY, (dictHistory_list, paging) => ({ dictHistory_list, paging }))
const getDictHistoryDetail = createAction(GET_DICT_HISTORY_DETAIL)
const rollbackOneDict = createAction(ROLLBACK_ONE_DICT)
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))
//추가
const tellMeTotalLength = createAction(TELL_ME_TOTAL_LENGTH)
const searchDict = createAction(SEARCH_DICT, (query, paging) => ({ query, paging }))
const doubleCheckDict = createAction(DOUBLE_CHECK_DICT, (dictName) => ({ dictName }))

/* initial state */
const initialState = {
  is_loading: false,
  isLike: false,
  list: [],
  paging: { page: null, size: 10 },
}

/* middleware */
const getDictMainDB = (page = null, size = null) => {
  return function (dispatch, getState, { history }) {
    dictApi
      .getDictMain()
      .then((res) => {
        let result = res.data.data.slice(page, size)
        let paging = {
          page: page + result.length + 1,
          size: size + 10,
        }
        if (result.length === 0) {
          dispatch(loading(false))
          return
        }
        dispatch(getDictMain(result, paging))
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
      .then((response) => {
        const dict_list = [...response.data.data]

        dispatch(loading(false))
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

const getTodayDictListDB = () => {
  return function (dispatch, getState, { history }) {
    dictApi
      .getTodayDict()
      .then((response) => {
        const todayDict_list = response.data.data
        dispatch(getTodayDictList(todayDict_list))
        dispatch(loading(false))
        console.log(todayDict_list)
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

const addDictDB = (title, summary, content) => {
  return function (dispatch, getState, { history }) {
    dictApi
      .addDict(title, summary, content)
      .then((res) => {
        history.push('/dict')
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

const editDictDB = (dictId, summary, content) => {
  return function (dispatch, getState, { history }) {
    dictApi
      .editDict(dictId, summary, content)
      .then((res) => {
        history.push(`/dict/detail/${dictId}`)
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

const deleteDictDB = (dictId) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie('token')

    dictApi
      .deleteDict(dictId)
      .then((res) => {
        history.push('/dict')
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

const searchDictDB = (keyword = '', page = null, size = null) => {
  return function (dispatch, getState, { history }) {
    dictApi
      .searchDict(keyword)
      .then((res) => {
        let result = res.data.data.slice(page, size)
        let paging = {
          page: page + result.length + 1,
          size: size + 10,
        }
        if (result.length === 0) {
          dispatch(loading(false))
          return
        }
        dispatch(getDictMain(result, paging))
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

const getDictHistoryDB = (dictId) => {
  return function (dispatch, getState, { history }) {
    dictApi
      .getDictHistory(dictId)
      .then((response) => {
        const dictHistory_list = response.data.data
        dispatch(getDictHistory(dictHistory_list))
        dispatch(loading(false))
        console.log(dictHistory_list)
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

const doubleCheckDictDB = (dictName) => {
  return function (dispatch, getState, { history }) {
    dictApi
      .dobleCheckDict(dictName)
      .then((res) => {
        console.log(res.data.data.result)
        if (res.data.data.result === true) {
          swal({
            title: '등록되지 않은 단어입니다.',
            text: '최초 등록자가 되어보세요!',
            icon: 'success',
          })
        } else if (res.data.data.result === false) {
          swal('이미 등록된 단어입니다.', {
            icon: 'warning',
          })
        }
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

/* reducer */
export default handleActions(
  {
    [GET_DICT_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.dictList
      }),
    [GET_DICT_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.oneDict
      }),
    [GET_TODAY_DICT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.todayDictList
      }),
    [ADD_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.dictList)
      }),
    [EDIT_DICT]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex((p) => p.dictId === action.payload.dictId)

        draft.list[index] = {
          ...draft.list[index],
          ...action.payload.dict,
        }
      }),
    [DELETE_DICT]: (state, action) =>
      produce(state, (draft) => {
        let newDictList = draft.list.filter((p) => {
          if (p.dictId !== action.payload.dict) {
            return p
          }
        })
        draft.list = newDictList
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
        draft.list = action.payload.dictHistory_list
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
    [TELL_ME_TOTAL_LENGTH]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [SEARCH_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload
      }),
    [GET_DICT_HISTORY]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.dictHistory
      }),
  },
  initialState
)

/* export */
const actionCreators = {
  getDictMain,
  getDictDetail,
  getTodayDictList,
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
  getTodayDictListDB,
  addDictDB,
  editDictDB,
  deleteDictDB,
  tellMeTotalLength,
  searchDict,
  searchDictDB,
  getDictHistoryDB,
  doubleCheckDictDB,
}

export { actionCreators }
