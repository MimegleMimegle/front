import React, { useState } from 'react'
import styled from 'styled-components'
import { likeApi } from '../shared/api'
import { useHistory } from 'react-router'
import '../index.css'
import { ReactComponent as ViewIcon } from '../styles/icons/조회_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/좋아요 비활성_18dp.svg'
import { ReactComponent as FullHeartIcon } from '../styles/icons/좋아요 활성_18dp.svg'
import { ReactComponent as CommentIcon } from '../styles/icons/댓글_18dp.svg'


const PostCard = ({ post }) => {
  const history = useHistory()

  const onC = () => {
    history.push(`/post/detail/${post && post.boardId}`)
  }
  const [likeCount, setLikeCount] = useState(post.likeCnt)
  const [isLiked, setIsLiked] = useState(post.isLike)

  const hour = post.createdAt.split('T')[1].split('.')[0]


  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await likeApi
        .likeBoard(post.boardId)
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
        .likeBoard(post.boardId)
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
            <Title>{post && post.title}</Title>
            <HashTagHere>
              {post.hashTags &&
                post.hashTags.map((hashTag, index) => {
                  return <pre key={index}> #{hashTag}</pre>
                })}
            </HashTagHere>
          </Content>
          <Icon>
            <IconBox>
              <ViewIcon />
              <Number>{post && post.views }</Number>
            </IconBox>
            <IconBox>
              {isLiked? < FullHeartIcon onClick={handleClickLike}/> :< EmptyHeartIcon onClick={handleClickLike}/>}
              <Number className="like-count">{likeCount}</Number>
            </IconBox>
            <IconBox>
              <CommentIcon />
              <Number>{post&&post.commentCnt}</Number>
            </IconBox>
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
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
`

const Wrap = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

const UserInfo = styled.div`
  display: flex;
  height: 30px;
  margin: 0 0 0 3px;
  .createdate {
    display: flex;
  }
`

const UserImg = styled.img`
  margin: 0 8px 0 0;
  width: 28px;
  height: 28px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 150px;
`
const Writer = styled.p`
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
`

const CreatedAt = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 300;
  font-size: 9px;
  line-height: 11px;
  margin: 0 3px 0 0;
`

const Content = styled.div`
  margin: 10px 0 0 0;
  cursor: pointer;
  height: 30px;
  width: 250px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 0 3px;
`

const HashTagHere = styled.div`
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: normal;
  display: flex;
  font-size: 12px;
  line-height: 20px;
`

const Icon = styled.div`
  display: flex;
  padding: 8px 0;
`

const Number = styled.p`
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
const IconBox = styled.div`
  display: flex;
  align-items: center;
`
