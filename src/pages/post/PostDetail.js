import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as postActions } from '../../redux/modules/post'
import swal from 'sweetalert'
import styled from 'styled-components'
import { likeApi } from '../../shared/api'
import { boardApi } from '../../shared/api'

import CommentTest from '../CommentTest'
import Header from '../../components/Header'

import YellowIcon from '../../styles/image/smileIcon_Yellow.png'
import { ReactComponent as ViewIcon } from '../../styles/icons/조회_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../../styles/icons/좋아요 비활성_18dp.svg'
import { ReactComponent as FullHeartIcon } from '../../styles/icons/좋아요 활성_18dp.svg'
import { ReactComponent as CommentIcon } from '../../styles/icons/댓글_18dp.svg'
import { IoCloseOutline } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'

const PostDetail = (props) => {
  const dispatch = useDispatch()

  const username = localStorage.getItem('username') // 현재 로그인 한 사람의 아이디
  const boardId = Number(props.match.params.boardId)

  const [post, setPost] = useState([])
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [toggleModalChang, setToggleModalChang] = useState(false)

  const getOnePostDB = async () => {
    await boardApi
      .getOnePost(boardId)
      .then((response) => {
        setPost(response.data.data)
        setIsLiked(response.data.data.isLike)
        setLikeCount(response.data.data.likeCnt)
      })
      .catch((error) => {
        console.log('게시글 상세 정보 불러오기 문제 발생', error.response)
      })
  }

  const del = () => {
    dispatch(postActions.delPostDB(boardId))
  }

  useEffect(() => {
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

  const clickToggleModalChang = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleModalChang(!toggleModalChang)
  }

  return (
    <>
      <Header type="PostDetail" low></Header>
      <PostWrap>
        <Profile>
          <UserInfo>
            <UserProfile src={post.profileImageUrl} alt="" />
            <div className="userinfo">
              <Writer>{post.writer}</Writer>
              {/* <div className="createdate">{post && post.createdAt.split('T')[0]}</div> */}
            </div>
          </UserInfo>
          {username === post.username ? (
            <button style={{ padding: '5px 5px 0' }} onClick={clickToggleModalChang}>
              <BsThreeDotsVertical size="18" />
            </button>
          ) : null}
          {toggleModalChang && (
            <ModalChang>
              <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button style={{ padding: '0', height: '100%' }} onClick={clickToggleModalChang}>
                  <IoCloseOutline style={{ fontSize: '18px' }} />
                </button>
              </div>
              <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button
                  style={{ fontSize: '12px', padding: '0' }}
                  onClick={() => {
                    history.push(`/post/edit/${boardId}`)
                  }}
                >
                  수정하기
                </button>
              </div>
              <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <button onClick={del} style={{ fontSize: '12px', padding: '0' }}>
                  삭제하기
                </button>
              </div>
            </ModalChang>
          )}
        </Profile>

        <Middle>
          <Title>{post.title}</Title>

          <Content>{post.content}</Content>
          <ImageBox>
            <ContentImg src={post ? post.thumbNail : null} alt="" />
          </ImageBox>
          <HashTagHere>
            {post.hashTags &&
              post.hashTags.map((hashTag, index) => {
                return (
                  <p className="one-hashtag" key={index}>
                    #{hashTag}
                  </p>
                )
              })}
          </HashTagHere>
        </Middle>

        <ViewLikeComment>
          <div className="icon-box">
            <button className="icon-box__button no-pointer">
              <ViewIcon />
            </button>
            <span className="icon-box__text">{post.views}</span>
          </div>
          <div className="icon-box">
            <button className="icon-box__button" onClick={handleClickLike}>
              {isLiked ? <FullHeartIcon /> : <EmptyHeartIcon />}
            </button>
            <span className="icon-box__text">{likeCount}</span>
          </div>
          <div className="icon-box">
            <button className="icon-box__button no-pointer">
              <CommentIcon />
            </button>
            <span className="icon-box__text">{post.commentCnt ? post.commentCnt : 0}</span>
          </div>
        </ViewLikeComment>
      </PostWrap>

      <CommentTest post={post} />
    </>
  )
}

const PostWrap = styled.div`
  padding: 0 16px;
`

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  .createdate {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`

const UserProfile = styled.img`
  border-radius: 150px;
  width: 28px;
  height: 28px;
  border: 1px solid black;
  margin: 0 8px 0 0;
`
const Writer = styled.div`
  font-size: 12px;
`

const Middle = styled.div`
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-family: 'Pretendard-Medium';
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: 0 0 8px;
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  height: 100%;
`

const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`

const ContentImg = styled.img`
  width: 100%;
  object-fit: cover;
`

const HashTagHere = styled.div`
  display: flex;
  font-size: 12px;
  .one-hashtag {
    padding: 0 7px 0 0;
  }
`

const ViewLikeComment = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 16px;
  .icon-box {
    display: flex;
    align-items: center;
    padding: 0 10px 0 0;
    .icon-box__button {
      padding: 5px 4px 0 0;
    }
    .no-pointer {
      cursor: default;
    }
    .icon-box__text {
      font-size: ${({ theme }) => theme.fontSizes.base};
      line-height: 27px;
    }
  }
`

const ModalChang = styled.div`
  position: absolute;
  top: 70px;
  right: 16px;
  width: auto;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export default PostDetail
