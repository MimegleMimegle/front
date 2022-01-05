import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as postActions } from '../../redux/modules/post'
import swal from 'sweetalert'
import styled from '@emotion/styled'
import { likeApi } from '../../shared/api'
import { AiOutlineEye } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import CommentTest from '../CommentTest'
import {IoIosArrowBack} from 'react-icons/io'

const PostDetail = (props) => {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디

  const [post, setPost] = useState([])
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const getOnePostDB = async () => {
    let response = await axios.get(`http://54.180.150.230/api/board/${boardId}`)
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

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await likeApi
        .likeBoard(boardId)
        .then((response) => {
          console.log(response.data)
          setIsLiked(false)
          setLikeCount(likeCount - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await likeApi
        .likeBoard(boardId)
        .then((response) => {
          console.log(response.data)
          setIsLiked(true)
          setLikeCount(likeCount + 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }
  const [toggleModalChang, setToggleModalChang] = React.useState(false)

  const clickToggleModalChang = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModalChang(!toggleModalChang)
  }

  // const hour = post.createdAt.split('T')[1].split(':')
  
  return (
    <>
    <PostWrap>
      <Goback><IoIosArrowBack size="19px"/></Goback>
      <Profile>
        <UserInfo>
          <UserProfile src={post.profileImageUrl} alt="" />
          <div className="userinfo">
            <Writer >{post.writer}</Writer>
            <div className="createdate">
              {/* <CreatedAt>{post.createdAt.split('T')[0]}</CreatedAt> */}
              
    
            </div>
          </div>
        </UserInfo>
          {username === post.username ?
            <div  onClick={clickToggleModalChang} ><BsThreeDotsVertical size="15"/></div> : null }
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

      <Middle> 
        <Title>{post.title}</Title>
        
        <Content style={{}} >{post.content}</Content>
        <ContentImg src={post ? post.thumbNail : null} alt="" />
        <HashTagHere>
                {post.hashTags &&
                  post.hashTags.map((hashTag, index) => {
                    return <p key={index}>#{hashTag}</p>
                  })}
        </HashTagHere>
      </Middle>  
          
      <ViewLikeComment>
      <AiOutlineEye style={{ fontSize: '18px' }}/>
      <Num style={{fontSize: '14px'}}>{post.views}</Num> 
      <button>{isLiked ? <HiHeart style={{ fontSize: '18px' }} onClick={handleClickLike} /> : <HiOutlineHeart style={{ fontSize: '18px' }} onClick={handleClickLike} />}</button>
      <Num style={{fontSize: '14px'}}>{likeCount}</Num>
      <FiMessageSquare style={{ fontSize: '18px' }}/>
      <Num style={{fontSize: '14px'}}>{post.commentCnt? post.commentCnt: 0}</Num> 
      </ViewLikeComment>
    </PostWrap>

        <CommentTest post={post}/>
    </>
  )
}

const PostWrap = styled.div`

`
const Goback = styled.div`
  margin:0 12px;
`


const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px 12px 16px;

`

const UserInfo = styled.div`
  display:flex;
  align-items: center;
  .createdate {
    display: flex;
  }

`

const UserProfile = styled.img`
  border-radius: 150px;
  width: 28px;
  height:28px;
  border: 1px solid black;
  margin: 0 8px 0 0;
`
const Writer = styled.div`
  font-family: RixGwangalli;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 13px;
`

const CreatedAt = styled.div`
   font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 11px;
  margin: 0 3px 0 0 ;
`;

const Middle = styled.div`
  padding: 0 30px;
`

const Title = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 12px;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
font-family: Pretendard;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 12px;
margin: 8px 0 12px 0;

display: flex;
align-items: center;
`;

const ContentImg = styled.img`
  width:300px;
`;

const HashTagHere = styled.div`
  display: flex;
  fontSize: 12px;
`

const ViewLikeComment = styled.div`
  display: flex;
  align-items: center;
  margin: 16px;
`

const Num = styled.text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  margin: 0 9.5px 0 5px;
`;

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
