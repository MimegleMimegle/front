import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as postActions } from '../../redux/modules/post'
import swal from 'sweetalert'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PostDetail = (props) => {
  const dispatch = useDispatch()

 
  const del = () => {
    dispatch(postActions.delPostDB(boardId));
  };
  const token = localStorage.getItem('token')
  const nickName = window.localStorage.getItem('nickname')
  console.log(token)
  console.log(nickName)


  const [post, setPost] = useState([])


  const getOnePostDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/board/${boardId}`)
    console.log(response)
    setPost(response.data.data)
  }


  React.useEffect(() => {
    getOnePostDB()
  }, [])

  const boardId = Number(props.match.params.boardId)

  console.log(post)
  return (
    <>
      <Container>
        {nickName===post.writer?
        <>
        <button onClick={()=>{history.push(`/post/edit/${boardId}`)}}>수정</button>
        <button onClick={del}>삭제</button> </> : null }

          <img src={post.profileImageUrl} alt=""/>
          <div >{post.writer}</div>
          <div>{post.createdAt}</div>

          <div >{post.title}</div>
          
          <div >{post.content}</div>
          <img src={post ? post.thumbNail : null} alt="" />

          <div >좋아요수 : {post.likeCnt}</div>
          <div >등록 날짜 : {post.createdAt}</div>
          {/* <div >조회수 : {post.views}</div> */}
        </Container>
    </>
  )
}

export default PostDetail;

