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

  /* post 정보에 해시태그 리스트 없음 > 회의에서 확인 필요! */

  return (
    <>
      <Container postList={post} onClick={onC}>
        <p>{post.writer}</p>
        <p>{post.username}</p>
        <PostBody>
          <img className="uploadimg" src={post.thumbNail} alt="" />
          <div className="listtitle">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
          {post.hashTags &&
            post.hashTags.map((hashTag) => {
              return <p>#{hashTag}</p>
            })}
        </PostBody>
        <p>{post.createdAt}</p>
        <AiOutlineEye /> {post.views} <AiOutlineHeart />
        {post.likeCnt}
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
