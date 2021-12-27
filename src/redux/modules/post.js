import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { boardApi } from '../../shared/api'
import { applyMiddleware } from 'redux';
import moment from 'moment';
import "moment";
import axios from 'axios';
import { Login } from '../../pages';

// /* action type */ 목록/상세/작성/수정/삭제/검색
const GET_POST = "GET_POST"; 
const GET_ONE_POST = "GET_ONE_POST";
const ADD_POST="ADD_POST";
const EDIT_POST="EDIT_POST";
const DELETE_POST="DELETE_POST";
const LOADING = "LOADING";

// /* action creator */
const getPosts = createAction(GET_POST, (postlist)=>({postlist}));
const getOnePost = createAction(GET_ONE_POST, (postId)=> ({postId}));
const addPost = createAction(ADD_POST,(post)=>({post}));
const editPost = createAction(EDIT_POST,(postId, post,newPost)=> ({postId,post,newPost}));
const deletePost = createAction(DELETE_POST,(postId)=>({postId,}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));



// /* initial state */
const initialState = {
    postlist: [],
    post: [],
    is_laoding: false,

}

// const initialPost = [{
//     postId: 0,
//     title:"제목",
//     content: "내용",
//     writer: "작성자",
//     createdAt:  moment().format("YYYY-MM-DD hh:mm:ss"),
//     subject: "말머리",
//     view: 0,
//     likeCnt:0,
// },]

// /* middleware */
const getPostsDB = () => {
  return async function (dispatch, getState, { history }) {
    await boardApi
      .getPosts()
      .then((res) => {
        console.log(res.data)
        dispatch(getPosts(res))
      })
      .catch((err) => {
        console.log(err.res)
        console.log(err.res.data)
        console.log(err.res.status)
      })
  }
}

const getOnePostDB = (postId) => {
  return async function (dispatch,getState,{history}) {

    await boardApi
    .getOnePost(postId)
    .then((res) => {
      console.log(res)
    })
    .catch((err)=> console.log('상세페이지 불러오기에 문제 발생',err))
  }
}

const addPostDB = (title,content,thumbNail) => {
  return async function(dispatch,getState,{history}){
    
    const token = localStorage.getItem('token')
    let formData=new FormData()
    formData.append('title', title)
    formData.append('content',content)
    formData.append('thumbNail',thumbNail)

    const DB = {
      method: 'post',
      url: `http://52.78.155.185/api/board`,
      data: formData,
      headers: {
        authorization: `Bearer ${token}`
      },
    }
    axios(DB)
    .then(() => {
      window.alert('', '성공적으로 등록되었습니다', 'success')
      history.push('/api/board')
    })

    .catch((err)=> {
      if (err.response.status === 403) {
        window.alert('로그인 세션 만료')
        history.replace('/')

      }
    })

    // boardApi
    // .addPost(title,content)
    // .then((res)=>{
    //   // console.log(res.data)
    //   dispatch(addPost(res))
    //   console.log(addPost(res))
    //   console.log(res.data);
    //   console.log(res.status);
    //   window.location.href="/"
    // })
    // .catch((err) => {
    //   console.log('post작성 실패!',err)
    // })
    
  }
}

const editPostDB = (postId, newPost) => {
  return async function( dispatch, getState,{history}){
    await boardApi
    .editPost(postId, newPost)
    .then((res)=> {
      console.log(res)
      dispatch(editPost(res,postId,newPost))
    })
    .catch((err)=> console.log('게시글 수정하는데 문제 발생',err.response))

  }
}

const delPostDB = (postId) => {
  return async function(dispatch, getState, {history}) {
    await boardApi
    .deletePost(postId)
    .then((res) => {
      console.log("게시글 삭제 성공",res.data);
      console.log(res.status)
      dispatch(deletePost(postId))

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
        draft.post=action.payload.post;

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
  getOnePost,
  getOnePostDB,
  addPost,  
  addPostDB,
  editPost,
  editPostDB,
  deletePost,
  delPostDB,
  loadPost,
}

export { actionCreators }
