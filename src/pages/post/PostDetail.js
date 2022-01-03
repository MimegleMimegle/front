import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as postActions } from '../../redux/modules/post'
import { actionCreators as likeActions } from '../../redux/modules/like'
import { AiOutlineEye } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'
import swal from 'sweetalert'
import { Container } from 'semantic-ui-react'
import styled from '@emotion/styled'
import like from '../../redux/modules/like'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { getCookie } from '../../shared/cookie'
import CommentTest from '../CommentTest'

const PostDetail = (props) => {
  const dispatch = useDispatch()

  const token = getCookie('token')
  const nickName = window.localStorage.getItem('nickname')
  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  console.log(nickName, username)

  const [post, setPost] = useState([])
  const [isLike, setLike] = useState(false)

  const getOnePostDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/board/${boardId}`)
    console.log(response)
    setPost(response.data.data)
  }

  const del = () => {
    dispatch(postActions.delPostDB(boardId))
  }

  const boardId = Number(props.match.params.boardId)

  React.useEffect(() => {
    getOnePostDB()
  }, [])

  const likePost = async () => {
    let response = await axios.get(`http://52.78.155.185/api/board/${boardId}`)
    setLike(response.data.data.like) //라이크를 달라고 하자아...
    // dispatch(likeActions.changeLikeBoardDB(props.boardId, token))
    console.log(response.data.data) //라이크를 달라고 하자...
  }

  return (
    <>
      <Container>
        {nickName === post.writer ? (
          <>
            <button
              onClick={() => {
                history.push(`/post/edit/${boardId}`)
              }}
            >
              수정
            </button>
            <button onClick={del}>삭제</button>{' '}
          </>
        ) : null}

        <Profile>
          <UserProfile src={post.profileImageUrl} alt="" />
          <div>
            <div>{post.writer}</div>
            <div>{post.createdAt}</div>
          </div>
        </Profile>

        <div>{post.title}</div>

        <div>{post.content}</div>
        <img classname="contentimg" src={post ? post.thumbNail : null} alt="" />

        <div>{isLike ? <IoIosHeart cursor="pointer" onClick={likePost} /> : <IoIosHeartEmpty cursor="pointer" onClick={likePost} />}</div>
        <div>{post.likeCnt}개</div>

        <AiOutlineEye />
        <div>{post.views}</div>
        <FiMessageSquare />
        <div>{post.commentCnt}</div>
      </Container>

      <CommentTest boardId={boardId} />
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

const Heart = styled.div``
const IsLike = styled.div`
  display: flex;
`

export default PostDetail
