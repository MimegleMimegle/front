import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as postActions } from '../../redux/modules/post'
import { actionCreators as likeActions } from '../../redux/modules/like'
import swal from 'sweetalert'
import styled from '@emotion/styled'
import like from '../../redux/modules/like'
import { AiOutlineEye } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'

import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getCookie } from '../../shared/cookie'
import CommentTest from '../CommentTest'

const PostDetail = (props) => {
  const dispatch = useDispatch()

  const token = getCookie('token')
  const nickName = window.localStorage.getItem('nickname')
  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  console.log(nickName, username)

  const [post, setPost] = useState([])
  const [liked, setLiked] = useState(false);

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
    if(!token) {
      swal("로그인 후 사용해주세요", "", "error")
      // history.push("/login")
    }
    dispatch(likeActions.changeLikeBoardDB(boardId))
  }

  const [toggleModalChang, setToggleModalChang] = React.useState(false)

  const clickToggleModalChang = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModalChang(!toggleModalChang)
  }

  return (
    <>
      <Container>
        {/* {nickName === post.writer ? (
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
        ) : null} */}

        <Profile>
          <UserInfo>
          <UserProfile src={post.profileImageUrl} alt="" />
          <div>
            <div>{post.writer}</div>
            <div>{post.createdAt}</div>
          </div>
          </UserInfo>
          <div  onClick={clickToggleModalChang} ><BsThreeDotsVertical size="25" style ={{margin:"20px", cursor:"pointer"}}/></div>
          {toggleModalChang && (
          <ModalChang>
            <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button style={{ padding: '0', height: '100%' }} onClick={clickToggleModalChang}>
              <IoCloseOutline style={{ fontSize: '18px' }} />

              </button>
            </div>
            <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button style={{ fontSize: '12px', padding: '0' }} onClick={() => {
                history.push(`/post/edit/${boardId}`)
              }}>수정하기</button>
            </div>
            <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button onClick={del} style={{ fontSize: '12px', padding: '0' }}>삭제하기</button>
            </div>
          </ModalChang>
        )}
        </Profile>

        <div className="content"> 
          <div >{post.title}</div>
          
          <div >{post.content}</div>
          <img classname="contentimg" style={{width:"100%", height:"80%"}}src={post ? post.thumbNail : null} alt="" />
        </div>  
          
          <ViewLikeComment>
          <AiOutlineEye /><div className="count">{post.views}</div> 
          {post.isLike ? 
          <IoIosHeart cursor="pointer" onClick={likePost}/>
          :
          <IoIosHeartEmpty
          cursor="pointer"
          onClick={likePost}/>}
          <div className="count">{post.likeCnt}</div>          
          <FiMessageSquare/><div className="count">{post.commentCnt}</div> 
        
          </ViewLikeComment>
        </Container>

        <CommentTest post={post}/>
    </>
  )
}

const Container =styled.div`
  .content {
    padding: 2px 25px;
  }
`

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserInfo = styled.div`
  display:flex;
  padding: 10px;
`

const UserProfile = styled.img`
  border-radius: 150px;
  width: 50px;
  height:50px;

`

const ViewLikeComment = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 15px;

  .count{
    margin: 2px 15px 0 3px;

  }
`

const ModalChang = styled.div`
  position: absolute;
  right: 0;
  width: auto;
  height: auto;
  border: 1px solid lightgray;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export default PostDetail;
