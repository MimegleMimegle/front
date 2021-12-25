import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { commentApi } from '../../shared/api'

/* action type */

const GET_COMMENTS = 'GET_COMMENTS'
const ADD_COMMNET = 'ADD_COMMENT'
const EDIT_COMMENT = 'EDIT_COMMENT'
const DEL_COMMENT = 'DEL_COMMENT'

/* action creator */

const getComments = createAction(GET_COMMENTS, (postId, comments) => ({ postId, comments }))
const addComment = createAction(ADD_COMMNET, (postId, comment) => ({ postId, comment }))
const editComment = createAction(EDIT_COMMENT, (postId, commentId, newComment) => ({ postId, commentId, newComment }))
const delComment = createAction(DEL_COMMENT, (postId, commentId) => ({ postId, commentId }))

/* initial state */

const initialState = {
  comment_list: {},
}

/* middleware */

const getCommentsDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
      return
    }

    await commentApi
      .getComments(postId)
      .then((res) => {
        console.log(res.data)
        dispatch(getComments(postId)) // res.data 확인 후 파라미터에 추가
      })
      .catch((err) => {
        console.log('댓글 목록을 불러오는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const addCommentDB = (postId, comment) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
      return
    }

    await commentApi
      .addComment(postId, comment)
      .then((res) => {
        /* response로 작성한 comment data 받을 수 있는지 백 확인 필요 */
        console.log(res)
        dispatch(addComment(postId, comment))
      })
      .catch((err) => {
        console.log('댓글을 작성하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const editCommentDB = (postId, commentId, newComment) => {
  return async function (dispatch, getState, { history }) {
    if (!postId || !commentId) {
      return
    }

    await commentApi
      .editComment(postId, commentId, newComment)
      .then((res) => {
        console.log(res)
        dispatch(editComment(postId, commentId, newComment))
      })
      .catch((err) => {
        console.log('댓글을 수정하는 데 문제가 발생했습니다.', err.response)
      })
  }
}

const delCommentDB = (postId, commentId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId || !commentId) {
      return
    }

    await commentApi
      .deleteComment(postId, commentId)
      .then((res) => {
        console.log(res)
        dispatch(delComment(postId, commentId))
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
        draft.comment_list[action.payload.postId] = action.payload.comments
      }),
    [ADD_COMMNET]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list[action.payload.postId].unshift(action.payload.comment)
      }),
    [EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.comment_list[action.payload.postId].findIndex((c) => c.commentId === action.payload.commentId)
        draft.comment_list[action.payload.postId][idx] = { ...draft.comment_list[action.payload.postId][idx], ...action.payload.newComment }
      }),
    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list[action.payload.postId].filter((c) => c.commentId !== action.payload.commentId)
      }),
  },
  initialState
)

/* export */

const actionCreators = {
  getComments,
  getCommentsDB,
  addComment,
  addCommentDB,
  editComment,
  editCommentDB,
  delComment,
  delCommentDB,
}

export { actionCreators }
