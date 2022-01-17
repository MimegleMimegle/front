import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { dictQuestionApi } from '../../shared/api'
import { applyMiddleware } from 'redux'
import moment from 'moment'
import 'moment'
import { Login } from '../../pages'

// /* action type */ 목록/상세/작성/수정/삭제/검색
const GET_QUESTION = 'GET_QUESTION'
const GET_ONE_QUESTION = 'GET_ONE_QUESTION'
const ADD_QUESTION = 'ADD_QUESTION'
const EDIT_QUESTION = 'EDIT_QUESTION'
const DELETE_QUESTION = 'DELETE_QUESTION'
const LOADING = 'LOADING'

// /* action creator */
const getQuestion = createAction(GET_QUESTION, (question_list, paging) => ({ question_list, paging }))
const getOneQuestion = createAction(GET_ONE_QUESTION, (question, questionId) => ({ question, questionId }))
const addQuestion = createAction(ADD_QUESTION, (question) => ({ question }))
const editQuestion = createAction(EDIT_QUESTION, (questionId, _question) => ({ questionId, _question }))
const deleteQuestion = createAction(DELETE_QUESTION, (questionId, question) => ({ questionId, question }))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

// /* initial state */
const initialState = {
  list: [],
  paging: { page: null, size: 10 },
  detail: false,
}

// /* middleware */

const getQuestionsDB = (page = null, size = null) => {
  return function (dispatch, getState, { history }) {
    dictQuestionApi
      .getQuestions()
      .then((res) => {
        const question_list = res.data.data
        let result = res.data.data.slice(page, size)
        let paging = {
          page: page + result.length + 1,
          size: size + 10,
        }
        if (result.length === 0) {
          dispatch(loading(false))
          return
        }
        dispatch(getQuestion(question_list, paging, result))
      })
      .catch((err) => {
        console.log('게시판을 불러오기 문제 발생', err.response.data)
        console.log(err.response.status)
      })
  }
}

const getOneQuestionDB = (questionId) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true))
    dictQuestionApi
      .getOneQuestion(questionId)
      .then((res) => {
        console.log(res)
        const question_list = [...res.data.question]
        console.log(question_list)
        dispatch(loading(false))
      })
      .catch((err) => console.log('상세페이지 불러오기에 문제 발생', err))
  }
}

const addQuestionDB = (title, content, uploadFile) => {
  return async function (dispatch, getState, { history }) {
    const formData = new FormData()
    const question = {
      title: title,
      content: content,
    }

    formData.append('thumbNail', uploadFile)
    formData.append('dictQuestionUploadRequestDto', new Blob([JSON.stringify(question)],{type: 'application/json'}))
  
    await dictQuestionApi
    .writeQuestion(formData)
    .then((response)=> {
      const question =response.data.data
      dispatch(addQuestion(question))
      console.log(question)
    })
    .then(()=> {
      history.push('/dict/question')
    })
    .catch((err)=>{
      console.log('질문 작성하는데 문제가 발생했습니다', err.response)
      console.log(err.response.message)
    })
  }
}

const editQuestionDB = (questionId, title, uploadFile, content) => {
  return async function (dispatch, getState, { history }) {
    const formData = new FormData()
    const question = {
      title: title,
      content: content,
    }

    formData.append('thumbNail', uploadFile)
    formData.append('dictQuestionUpdateRequestDto', new Blob([JSON.stringify(question)], { type: 'application/json' }))

    await dictQuestionApi
      .editQuestion(questionId, formData)
      .then((response) => {
        console.log(response.data)
        const _question = { ...question, thumbNail: uploadFile }
        dispatch(editQuestion(questionId, _question))

        history.replace(`/dict/question/detail/${questionId}`)
      })
      .catch((err) => {
        console.log('게시글 수정하는데 문제 발생', err.response)
        history.replace(`/dict/question/detail/${questionId}`)
      })
  }
}

const delQuestionDB = (questionId) => {
  return async function (dispatch, getState, { history }) {
    await dictQuestionApi
      .deleteQuestion(questionId)
      .then((res) => {
        console.log(res.data)
        dispatch(deleteQuestion(questionId))
        history.replace('/dict/question')
      })

      .catch((err) => {
        console.log('게시물 삭제  실패', err)
      })
  }
}

const loadQuestion =
  () =>
  async (dispatch, getState, { history }) => {
    const { data } = await dictQuestionApi.getQuestions()
    dispatch(loading(data))
  }

// /* reducer */

export default handleActions(
  {
    [GET_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        //  draft.list = action.payload.questionlist;
        draft.list = action.payload.question_list
      }),

    [ADD_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.question_list)
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_laoding = action.payload.is_loading
      }),

    [EDIT_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex((p) => p.questionId === action.payload.questionId)

        draft.list[index] = {
          ...draft.list[index],
          ...action.payload._question,
        }
      }),
    // [EDIT_QUESTION] : (state, action) => produce(state, (draft) => {
    //   let idx = draft.list.findIndex((p) => p.questionId === action.payload.questionId)
    //   draft.list[idx] = {...draft.list[idx], ...action.payload.question}
    // }),
    [DELETE_QUESTION]: (state, action) =>
      produce(state, (draft) => {
        let new_question_list = draft.list.filter((v) => {
          if (v.questionId !== action.payload.question) {
            return v
          }
        })
        draft.list = new_question_list
      }),
    // [DELETE_QUESTION] : (state, action) => produce(state, (draft) => {
    //   draft.list = draft.list.filter((p) => p.questionId !== action.payload.questionid)
    // }),
  },
  initialState
)

// /* export */

const actionCreators = {
  getQuestion,
  getOneQuestion,
  addQuestion,
  editQuestion,
  deleteQuestion,
  loadQuestion,
  getQuestionsDB,
  getOneQuestionDB,
  addQuestionDB,
  editQuestionDB,
  delQuestionDB,
}

export { actionCreators }
