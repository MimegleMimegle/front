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

  const hour = post.createdAt.split('T')[1].split('.')[0]

  return (
    <>
      <FullWrap>
        <Wrap postList={post} onClick={onC}>
          <UserInfo>
            <UserImg src={post ? post.profileImageUrl : null} alt="" />
            <div className="userinfo">
              <Writer>{post ? post.writer : null}</Writer>
              <div className="createdate">
                <CreatedAt>{post ? post.createdAt.split('T')[0] : null}</CreatedAt>
                <CreatedAt>{post ? hour.split(':')[0] + ':' + hour.split(':')[1] : null}</CreatedAt>
              </div>
            </div>
          </UserInfo>
          <Content>
            <Title>{post ? post.title : null}</Title>
            <HashTagHere>
              {post.hashTags &&
                post.hashTags.map((hashTag, index) => {
                  return <p key={index}>#{hashTag}</p>
                })}
            </HashTagHere>
          </Content>
          <Icon>
            <AiOutlineEye size="18" color="#878C92" />
            <Number>{post ? post.views : null}</Number>
            <AiOutlineHeart color="#878C92" size="18" />
            <Number>{post ? post.likeCnt : null}</Number>
            <FiMessageSquare size="19" color="#878C92" />
            <Number>{post ? post.commentCnt : null}</Number>
          </Icon>
        </Wrap>
        {post.thumbNail ? <ThumbNail className="uploadimg" src={post && post.thumbNail} alt="" /> : null}
      </FullWrap>
    </>
  )
}

export default PostCard

const FullWrap = styled.div`
  height: 133px;
  padding: 16px 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
`

const Wrap = styled.div`
  cursor: pointer;
`

const UserInfo = styled.div`
  display: flex;
  height: 30px;
  .createdate {
    display: flex;
  }
`

const UserImg = styled.img`
  margin: 0 8px 0 0;
  width: 28px;
  height: 28px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 150px;
`
const Writer = styled.text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
`

const CreatedAt = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 11px;
  margin: 0 3px 0 0;
`

const Content = styled.div`
  margin: 10px 0 0 0;
  cursor: pointer;
  hight: 30px;
  width: 250px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
`

const HashTagHere = styled.div`
  display: flex;
  fontsize: 12px;
`

const Icon = styled.div`
  display: flex;
  padding: 8px 0;
`

const Number = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  margin: 0 9.5px 0 5px;
`

const ThumbNail = styled.img`
  width: 60px;
  height: 60px;
  margin: 27px 0 0 0;
`
