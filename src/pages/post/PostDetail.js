import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as postActions } from '../../redux/modules/post'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'

import swal from 'sweetalert'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'


const PostDetail = (props) => {
  const dispatch = useDispatch()
  const [isLike, setIsLike] = useState(false);

 
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

  const likePost = async () => {
    let response = await axios.get(`http://52.78.155.185/api/board/${boardId}/like`)
    setIsLike(response.data.data.like)

    console.log(response.data.data.createdAt)
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

          <Profile>
          <UserProfile src={post.profileImageUrl} alt=""/>
          <div>
          <div >{post.writer}</div>
          <div >{post.createdAt}</div>
          </div>
          </Profile>

          <div >{post.title}</div>
          
          <div >{post.content}</div>
          <img classname="contentimg" src={post ? post.thumbNail : null} alt="" />
          

          <AiOutlineEye/><div>{post.views}</div> 
          <AiOutlineHeart/><div>{post.likeCnt}</div>
          <FiMessageSquare/><div>{post.commentCnt}</div> 
        </Container>
    </>
  )
}



const Profile = styled.div`
display: flex;
`

const UserProfile = styled.img`
  border-radius: 150px;
  width: 20%;
`

export default PostDetail;

