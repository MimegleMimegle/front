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

const addComment = createAction(ADD_COMMNET, (questionId, content) => ({ questionId, content }))
const editComment = createAction(EDIT_COMMENT, (questionId, commentId, newComment) => ({ questionId, commentId, newComment }))
const delComment = createAction(DEL_COMMENT, (questionId, commentId) => ({ questionId, commentId }))

/* initial state */

const initialState = {
  comment_list: {},
}

/* middleware */

const addCommentDB = (questionId, comment) => {
  return async function (dispatch, getState, { history }) {
    if (!questionId) {
      return
    }

    await commentApi
      .addComment(questionId, comment)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log('댓글을 작성하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const editCommentDB = (questionId, commentId, newComment) => {
  return async function (dispatch, getState, { history }) {
    if (!questionId || !commentId) {
      return
    }

    await commentApi
      .editComment(questionId, commentId, newComment)
      .then((res) => {
        console.log(res)
        dispatch(editComment(questionId, commentId, newComment))
      })
      .catch((err) => {
        console.log('댓글을 수정하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const delCommentDB = (questionId, commentId) => {
  return async function (dispatch, getState, { history }) {
    if (!questionId || !commentId) {
      return
    }

    await commentApi
      .deleteComment(commentId)
      .then((res) => {
        console.log(res)
        dispatch(delComment(questionId, commentId))
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
        draft.comment_list[action.payload.questionId] = action.payload.comment_list
      }),
    [ADD_COMMNET]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list[action.payload.questionId].unshift(action.payload.content)
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.comment_list[action.payload.questionId].findIndex((c) => c.commentId === action.payload.commentId)
        draft.comment_list[action.payload.questionId][idx] = { ...draft.comment_list[action.payload.questionId][idx], ...action.payload.newComment }
      }),
    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // let idx = draft.comment_list[action.payload.questionId].findIndex((c) => c.commentId === action.payload.commentId)
        // draft.comment_list[action.payload.questionId].splice(idx, 1)
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
