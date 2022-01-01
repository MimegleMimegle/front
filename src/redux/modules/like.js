import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { likeApi } from '../../shared/api'

const SET_LIKE_DICT = 'SET_LIKE_DICT'
const ADD_LIKE_DICT = 'ADD_LIKE_DICT'

const SET_LIKE_BOARD = 'SET_LIKE_BOARD'
const ADD_LIKE_BOARD = 'ADD_LIKE_BOARD'

const setLikeDict = createAction(SET_LIKE_DICT, (dictId, like = false) => ({ dictId, like }))
const addLikeDict = createAction(ADD_LIKE_DICT, (dictId, like = true) => ({ dictId, like }))

const setLikeBoard = createAction(SET_LIKE_BOARD, (boardId, result = false) => ({ boardId, result }))
const addLikeBoard = createAction(ADD_LIKE_BOARD, (boardId, result = true) => ({ boardId, result }))

const initialState = {
  like: [],
}

const changeLikeDictDB = (dictId) => {
  return function (dispatch, getState, { history }) {
    likeApi
      .likeDict(dictId)
      .then((response) => {
        // console.log(response.data)
        let like_data = []
        // response에서 필요한 데이터를 분류하여 like_data에 저장
        for (let i = 0; i < response.data.data.length; i++) {
          console.log(response)
          like_data.push({
            dict_id: response.data.data[i].dictId,
            like_count: response.data.data[i].likeCount,
            like: response.data.data[i].isLike,
          })
        }
        console.log(like_data)
        // 리덕스 상태 업데이트
        dispatch(setLikeDict(like_data))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const changeLikeBoardDB = (boardId, result) => {
  return function (dispatch, getState, { history }) {
    likeApi
      .likeBoard(boardId)
      .then((response) => {
        dispatch(setLikeBoard())
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default handleActions(
  {
    [SET_LIKE_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.like_data
      }),
    [ADD_LIKE_DICT]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.like_data
      }),

    [SET_LIKE_BOARD]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.result
      }),
    [ADD_LIKE_BOARD]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.result
      }),
  },
  initialState
)

//우리가 만든 액션 생성자들 export해주기
const actionCreators = {
  setLikeDict,
  addLikeDict,
  changeLikeDictDB,
  setLikeBoard,
  addLikeBoard,
  changeLikeBoardDB,
}

export { actionCreators }
