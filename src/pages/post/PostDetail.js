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
  const user_info = useSelector((state)=> state.user.user)
  const post_list = useSelector((state)=> state.post)
  console.log(user_info);
  console.log(post_list);
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
        <button onClick={()=>{history.push(`/post/edit/${boardId}`)}}>수정</button>
        <button>삭제</button>

        <div> 작성번호: {post.boardId}</div>
          <div >제목 : {post.title}</div>
          <div >작성자: {post.writer}</div>
          <div >내용: {post.content}</div>
          <div >좋아요수 : {post.likeCnt}</div>
          <div >등록 날짜 : {post.createdAt}</div>
          <div >조회수 : {post.views}</div>
        </Container>
    </>
  )
}

export default PostDetail;

