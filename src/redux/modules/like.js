import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { likeApi } from '../../shared/api'
import swal from 'sweetalert'

const SET_LIKE_DICT = 'SET_LIKE_DICT'
const ADD_LIKE_DICT = 'ADD_LIKE_DICT'

const SET_LIKE_BOARD = 'SET_LIKE_BOARD'
const ADD_LIKE_BOARD = 'ADD_LIKE_BOARD'

const setLikeDict = createAction(SET_LIKE_DICT, (dictId, likeCount, like) => ({ dictId, likeCount, like }))
const addLikeDict = createAction(ADD_LIKE_DICT, (dictId, likeCount, like) => ({ dictId, likeCount, like }))

const setLikeBoard = createAction(SET_LIKE_BOARD, (boardId, result = false) => ({ boardId, result }))
const addLikeBoard = createAction(ADD_LIKE_BOARD, (boardId, result = true) => ({ boardId, result }))

const initialState = {
  like: [],
}

const changeLikeDictDB = (dictId, likeCount, like) => {
  return function (dispatch, getState, { history }) {
    likeApi
      .likeDict(dictId)
      .then((response) => {
        const likeStatus = response.data.result
        dispatch(setLikeBoard(likeStatus))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

// const changeLikeBoardDB = (boardId, result) => {
//   return function (dispatch, getState, { history }) {
//     likeApi
//       .likeBoard(boardId)
//       .then((response) => {
//         let like_data = []
//         for (let i = 0; i < response.data.post_list.length; i++) {
//           console.log(response)
//           like_data.push({
//             post_id: response.data.post_list[i].post_Id,
//             like_user: response.data.post_list[i].like_user,
//             like_count: response.data.post_list[i].like_count,
//           })
//         }
//         dispatch(setLikeBoard(like_data))
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }

const changeLikeBoardDB = (boardId, liked) => {
  return function (dispatch, getState, { history }) {
    likeApi
      .likeBoard(boardId)
      .then((response) => {
        const likeStatus = response.data.result
        dispatch(setLikeBoard(likeStatus))
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
        console.log('여기가 action', action.payload.result)
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
