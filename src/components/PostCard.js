import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import HashTag from './HashTag'

const PostCard = ({ post }) => {
  const history = useHistory()

  const onC = () => {
    history.push(`/post/detail/${post.boardId}`)
  }

  return (
    <>
      <Wrap postList={post} onClick={onC}>
        <UserInfo>
          <img src={post ? post.profileImageUrl : null} alt="" style={{ borderRadius: '160px', width: '15%' }} />
          <div>
            <p>{post ? post.writer : null}</p>
            <p>{post ? post.createdAt : null}</p>
          </div>
        </UserInfo>
        <PostBody>
          <div className="text">
            <h4>{post ? post.title : null}</h4>
            <p>{post ? post.content : null}</p>
            <HashTagHere>
              {post
                ? post.hashTags.map((hashTag, index) => {
                    return <p key={index}>#{hashTag}</p>
                  })
                : null}
            </HashTagHere>
          </div>
          <img className="uploadimg" src={post ? post.thumbNail : null} alt="" />
        </PostBody>
        <AiOutlineEye /> {post ? post.views : null} <AiOutlineHeart />
        {post ? post.likeCnt : null} <FiMessageSquare /> {post ? post.commetCnt : null}
      </Wrap>
    </>
  )
}

export default PostCard

const Wrap = styled.div`
  padding: 0 10px;
  margin: 10px 0px;
`

const UserInfo = styled.div`
  display: flex;
`

const PostBody = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .text {
  }
  .uploadimg {
    width: 70px;
    height: 70px;
  }
`
const HashTagHere = styled.div`
  display: flex;
`
