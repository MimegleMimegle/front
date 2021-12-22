import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { boardApi } from '../../shared/api'
import { applyMiddleware } from 'redux';

// /* action type */
const SET_POST = "SET_POST";
const ADD_POST="ADD_POST";

const LOADING = 'LOADING'


// /* action creator */
const setPost = createAction(SET_POST, (post_list)=>({post_list}));
const addPost = createAction(ADD_POST,(post)=>({post}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

// /* initial state */
const initialstate = {
    list: [],
    is_laoding: false,

}

const initialPost = {
    boardId: 1,
    title:"제목",
    content: "내용",
    writer: "작성자",
    createdAt: "2021-12-25 10:00:00",
    subject: "말머리",
    view: 1,
    likeCnt:1,
};

// /* middleware */

// /* reducer */

export default handleActions(
    {
       [SET_POST]: (state, action) =>
       produce(state, (draft) => {
         draft.list = action.payload.post_list
        }),

       [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
      }),

      [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_laoding = action.payload.is_loading
      }),
    })

// /* export */

const actionCreators = {
    
}

export { actionCreators }
