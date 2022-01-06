import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { commentApi } from '../../shared/api'
import swal from 'sweetalert'

/* action type */

const GET_COMMENTS = 'GET_COMMENTS'
const ADD_COMMNET = 'ADD_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'
const DEL_COMMENT = 'DEL_COMMENT'

/* action creator */

const addComment = createAction(ADD_COMMNET, (boardId, content) => ({ boardId, content }))
const editComment = createAction(EDIT_COMMENT, (boardId, commentId, newComment) => ({ boardId, commentId, newComment }))
const delComment = createAction(DEL_COMMENT, (boardId, commentId) => ({ boardId, commentId }))

/* initial state */

const initialState = {
  comment_list: {},
}

/* middleware */

const addCommentDB = (boardId, comment) => {
  return async function (dispatch, getState, { history }) {
    if (!boardId) {
      return
    }

    await commentApi
      .addComment(boardId, comment)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log('댓글을 작성하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const editCommentDB = (boardId, commentId, newComment) => {
  return async function (dispatch, getState, { history }) {
    if (!boardId || !commentId) {
      return
    }

    await commentApi
      .editComment(boardId, commentId, newComment)
      .then((res) => {
        console.log(res)
        dispatch(editComment(boardId, commentId, newComment))
      })
      .catch((err) => {
        console.log('댓글을 수정하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const delCommentDB = (boardId, commentId) => {
  return async function (dispatch, getState, { history }) {
    if (!boardId || !commentId) {
      return
    }

    await commentApi
      .deleteComment(commentId)
      .then((res) => {
        console.log(res)
        dispatch(delComment(boardId, commentId))
        window.location.reload()
      })
      .catch((err) => {
        console.log('댓글을 삭제하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

/* reducer */

export default handleActions(
  {
    [GET_COMMENTS]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list[action.payload.boardId] = action.payload.comment_list
      }),
    [ADD_COMMNET]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list[action.payload.boardId].unshift(action.payload.content)
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.comment_list[action.payload.boardId].findIndex((c) => c.commentId === action.payload.commentId)
        draft.comment_list[action.payload.boardId][idx] = { ...draft.comment_list[action.payload.boardId][idx], ...action.payload.newComment }
      }),
    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // let idx = draft.comment_list[action.payload.boardId].findIndex((c) => c.commentId === action.payload.commentId)
        // draft.comment_list[action.payload.boardId].splice(idx, 1)
      }),
  },
  initialState
)

/* export */

const actionCreators = {
  addComment,
  addCommentDB,
  editComment,
  editCommentDB,
  delComment,
  delCommentDB,
}

export { actionCreators }
