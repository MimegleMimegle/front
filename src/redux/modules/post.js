import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { boardApi } from '../../shared/api'
import { applyMiddleware } from 'redux';
import moment from 'moment';

// /* action type */
const GET_POST = "GET_POST"; 
const ADD_POST="ADD_POST";
const EDIT_POST="EDIT_POST";
const DELETE_POST="DELETE_POST";
const LOADING = "LOADING";

// /* action creator */
const getPosts = createAction(GET_POST, (postlist)=>({postlist}));
const addPost = createAction(ADD_POST,(post)=>({post}));
const editPost = createAction(EDIT_POST,(postId, post)=> ({postId,post,}));
const deletePost = createAction(DELETE_POST,(postId)=>({postId,}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// /* initial state */
const initialState = {
    list: [],
    paging: { state: null, next: null, size: 3 },
    is_laoding: false,

}

const initialPost = [{
    postId: 0,
    title:"제목",
    content: "내용",
    writer: "작성자",
    createdAt:  moment().format("YYYY-MM-DD hh:mm:ss"),
    subject: "말머리",
    view: 0,
    likeCnt:0,
},]

// /* middleware */
const getPostsDB = () => {
  return async function (dispatch, getState, { history }) {
    await boardApi
      .getPosts()
      .then((res) => {
        dispatch(getPosts(res.data))
      })
      .catch((err) => {
        console.log(err , '게시판을 불러오는 데 문제가 발생!')
      })
  }
}

const addPostDB = (post) => {
  return async function(dispatch,getState,{history}){
    boardApi
    .writePost(post)
    .then((res)=>{
      // console.log(res.data)
      dispatch(addPost(res.data))
      window.location.href="/"
    })
    .catch((err) => {
      console.log('post작성 실패!',err)
    })
    
  }
}

const editPostDB = (postId, post) => {
  return function( dispatch, getState,{history}){
    boardApi
    .editPost(post)
    .then((res)=> {
      console.log(res)
      dispatch(editPost(res,postId))
    })
    .catch((err)=> console.log(err))

  }
}

const delPostDB = (postId) => {
  return function(dispatch, getState, {history}) {
    boardApi
    .deletePost(postId)
    .then((res) => {
      console.log("게시글 삭제 성공");
    })

    .catch((err)=> {
      console.log("게시물 삭제  실패", err);
    })
  }
}


const loadPost = () => 
  async(dispatch,getState,{history}) => {
    const {data} = await boardApi.getPosts();
    dispatch(loading(data));
  }


// /* reducer */

export default handleActions(
  {
       [GET_POST]: (state, action) =>
       produce(state, (draft) => {
         draft.list = action.payload.postlist.list
        }),

      [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_laoding = action.payload.is_loading
      }),

      [EDIT_POST] : (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.postId === action.payload.postId)
        draft.list[idx] = {...draft.list[idx], ...action.payload.post}
      }), 
    
      [DELETE_POST] : (state, action) => produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.postId !== action.payload.postid)
      }), 

  },
  initialState
)

// /* export */

const actionCreators = {
  getPosts,
  getPostsDB,
  addPost,  
  addPostDB,
  editPostDB,
  deletePost,
  delPostDB,
  loadPost,
}

export { actionCreators }
