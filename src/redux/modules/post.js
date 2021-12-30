import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { boardApi } from '../../shared/api'
import { applyMiddleware } from 'redux'
import moment from 'moment'
import 'moment'
import axios from 'axios'
import { Login } from '../../pages'

// /* action type */ 목록/상세/작성/수정/삭제/검색
const GET_POST = 'GET_POST'
const GET_ONE_POST = 'GET_ONE_POST'
const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'
const LOADING = 'LOADING'

// /* action creator */
const getPost = createAction(GET_POST, (post_list) => ({ post_list }))
const getOnePost = createAction(GET_ONE_POST, (post, boardId) => ({ post, boardId }))
const addPost = createAction(ADD_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (thumbNail, title, boardId, writer) => ({ thumbNail, title, boardId, writer }))
const deletePost = createAction(DELETE_POST, (boardId, post) => ({ boardId, post }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

// /* initial state */
const initialState = {
  list: [],
  detail: false,
}

const initalPost = {
  boardId: 'boardId',
  thumbNail: 'thumNail',
  title: 'title',
  username: 'username',
  writer: 'writer',
  createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
  views: 1,
  likeCnt: 1,
  hashTags: [],
}

// /* middleware */

const getPostsDB = () => {
  return function (dispatch, getState, { history }) {
    boardApi
      .getPosts()
      .then((res) => {
        const post_list = res.data.data
        dispatch(getPost(post_list))
      })
      .catch((err) => {
        console.log('게시판을 불러오기 문제 발생', err.response.data)
        console.log(err.response.status)
        console.log(err.res.headers)
      })
  }
}

const getOnePostDB = (boardId) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true))
    boardApi
      .getOnePost(boardId)
      .then((res) => {
        console.log(res)
        const post_list = [...res.data.post]
        console.log(post_list)
        dispatch(loading(false))
      })
      .catch((err) => console.log('상세페이지 불러오기에 문제 발생', err))
  }
}

const addPostDB = (category, title, content, uploadFile, hashTag_list) => {
  return async function (dispatch, getState, { history }) {
    const formData = new FormData()
    const post = {
      title: title,
      content: content,
      hashTags: hashTag_list,
    }

    formData.append('thumbNail', uploadFile)
    formData.append('boardUploadRequestDto', new Blob([JSON.stringify(post)], { type: 'application/json' }))

    await boardApi
      .writePost(category, formData)
      .then((response) => {
        const post = response.data.data
        dispatch(addPost(post))
      })
      .then(() => {
        history.push('/post')
      })
      .catch((error) => {
        console.log('게시글을 작성하는 데 문제가 발생했습니다.', error.response)
      })
  }
}

const editPostDB = (boardId, uploadFile, title, content, thumbNail,) => {
  return async function (dispatch, getState, { history }) {
    const token = localStorage.getItem('token')
    let formData = new FormData()
    const post={
      title:title,
      content:content,
    }
    formData.append('boardUploadRequestDto', new Blob([JSON.stringify(post)], { type: 'application/json' }))
    formData.append('thumbNail', uploadFile)

    axios({
      method: 'put',
      url: `http://52.78.155.185/api/board/${boardId}`,
      data: formData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const post = res.data.data
        dispatch(editPost(post))

        window.alert('', '게시글이 수정되었습니다.', 'success')
        history.push('/post')
      })
      .catch((err) => {
        console.log('게시글 수정하는데 문제 발생', err.response)
        console.log(err.response.status)
      })
  }
}

const delPostDB = (boardId) => {
  return async function (dispatch, getState, { history }) {
    await boardApi
      .deletePost(boardId)
      .then((res) => {
        console.log(res.data)
        dispatch(deletePost(boardId));
        history.push('/post')
      })

      .catch((err) => {
        console.log('게시물 삭제  실패', err)
      })
  }
}

const loadPost =
  () =>
  async (dispatch, getState, { history }) => {
    const { data } = await boardApi.getPosts()
    dispatch(loading(data))
  }

// /* reducer */

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        //  draft.list = action.payload.postlist;
        draft.list = action.payload.post_list
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post_list)
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_laoding = action.payload.is_loading
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex((l) => l.boardId === action.payload.boardId)

        draft.list[index] = {
          ...draft.list[index],
          ...action.payload.new_post,
        }
      }),
    // [EDIT_POST] : (state, action) => produce(state, (draft) => {
    //   let idx = draft.list.findIndex((p) => p.postId === action.payload.boardId)
    //   draft.list[idx] = {...draft.list[idx], ...action.payload.post}
    // }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let new_post_list = draft.list.filter((v) => {
          if (v.boardId !== action.payload.post) {
            return v
          }
        })
        draft.list = new_post_list
      }),
    // [DELETE_POST] : (state, action) => produce(state, (draft) => {
    //   draft.list = draft.list.filter((p) => p.postId !== action.payload.postid)
    // }),
  },
  initialState
)

// /* export */

const actionCreators = {
  getPost,
  getOnePost,
  addPost,
  editPost,
  deletePost,
  loadPost,
  getPostsDB,
  getOnePostDB,
  addPostDB,
  editPostDB,
  delPostDB,
}

export { actionCreators }
