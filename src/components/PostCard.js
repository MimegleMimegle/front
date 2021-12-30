import React, { useState } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai'
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
        <p>{post ? post.writer : null}</p>
        <p>{post ? post.username : null}</p>
        <PostBody>
          <img className="uploadimg" src={post ? post.thumbNail : null} alt="" />
          <div className="listtitle">
            <h4>{post ? post.title : null}</h4>
            <p>{post ? post.content : null}</p>
          </div>
          {post
            ? post.hashTags.map((hashTag, index) => {
                return <p key={index}>#{hashTag}</p>
              })
            : null}
        </PostBody>
        <p>{post ? post.createdAt : null}</p>
        <AiOutlineEye /> {post ? post.views : null} <AiOutlineHeart />
        {post ? post.likeCnt : null}
      </Container>
    </>
  )
}

export default PostCard

const Container = styled.div`
  background: red;
`

const PostBody = styled.div`
  width: 100%;
  height: auto;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .listtitle {
    margin: 5px 10px;
  }
  .uploadimg {
    width: 70px;
    height: 70px;
  }
`
