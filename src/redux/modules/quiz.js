import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { quizApi } from '../../shared/api'
import { flushSync } from 'react-dom'

/* action type */
const GET_QUIZ_LIST = 'GET_QUIZ_LIST'
const ADD_ANSWER = 'ADD_ANSWER'
const INIT_ANSWER = 'INIT_ANSWER'
const LOADING = 'LOADING'

/* action creator */
const getQuizList = createAction(GET_QUIZ_LIST, (quiz_list) => ({ quiz_list }))
const addAnswer = createAction(ADD_ANSWER, (user_answer) => ({ user_answer }))
const initAnswer = createAction(INIT_ANSWER, () => ({}))
const loading = createAction(LOADING, (loading) => ({ loading }))

/* initial state */
const initialState = {
  quiz_list: null,
  user_answer_list: [],
  is_loading: false,
}

/* middleware */
const getQuizListDB = (category) => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true))
    await quizApi
      .getQuizList(category)
      .then((res) => {
        const quiz_list = res.data.data
        dispatch(getQuizList(quiz_list))
      })
      .catch((err) => {
        console.log('퀴즈 데이터를 불러오는 데 문제가 발생했습니다.', err.response)
      })
  }
}

// /* reducer */

export default handleActions(
  {
    [GET_QUIZ_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.quiz_list = action.payload.quiz_list
        draft.is_loading = false
      }),
    [ADD_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_answer_list.push(action.payload.user_answer)
      }),
    [INIT_ANSWER]: (state, action) =>
      produce(state, (draft) => {
        draft.user_answer_list = []
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.loading
      }),
  },
  initialState
)

// /* export */

const actionCreators = {
  getQuizList,
  getQuizListDB,
  addAnswer,
  initAnswer,
}

export { actionCreators }
