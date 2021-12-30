import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
import { FiMessageSquare } from 'react-icons/fi'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import HashTag from './HashTag'

const PostCard = ({ post }) => {
  const history = useHistory()

  console.log(post)
  const onC = () => {
    history.push(`/post/detail/${post.boardId}`)
  }

  return (
    <>
      <Container postList={post} onClick={onC}>
        <UserInfo>
        <img/>
        <p>{post ? post.writer : null}</p>
        <p>{post ? post.createdAt : null}</p>
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
        {post ? post.likeCnt : null} <FiMessageSquare/> 댓글수
      </Container>
    </>
  )
}

export default PostCard

const Container = styled.div`
  background: red;
`

const UserInfo = styled.div`
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