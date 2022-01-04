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
    <FullWrap>
      <Wrap postList={post} onClick={onC}>
        <UserInfo>
          <img src={post ? post.profileImageUrl : null} alt="" style={{ borderRadius: '160px', width: '40px', height:'40px'}} />
          <div>
            <p>{post ? post.writer : null}</p>
            <p>{post ? post.createdAt : null}</p>
          </div>
        </UserInfo>
        <PostBody>
          <div className="text">
            <h4>{post ? post.title : null}</h4>
            <HashTagHere>
              {post
                ? post.hashTags.map((hashTag, index) => {
                    return <p key={index}>#{hashTag}</p>
                  })
                : null}
            </HashTagHere>
            <AiOutlineEye /> {post ? post.views : null} 
            <AiOutlineHeart />{post ? post.likeCnt : null} 
            <FiMessageSquare /> {post ? post.commentCnt : null}
          </div>
        </PostBody>
      </Wrap>
          {post.thumbNail?
          <img className="uploadimg" src={post.thumbNail} alt="" /> : null }
      </FullWrap>
    </>
  )
}

export default PostCard

const FullWrap = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(200, 200, 200);
  padding: 10px;

  .uploadimg {
    width: 70px;
    height: 70px;
    margin: 20px 0 0 0;
  }

`

const Wrap = styled.div`
  
`

const UserInfo = styled.div`
  display: flex;
`

const PostBody = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  cursor: pointer;

  .text {
  }
  
`
const HashTagHere = styled.div`
  display: flex;
`
