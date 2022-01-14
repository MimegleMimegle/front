import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dictQuestionApi } from '../shared/api'
import { useHistory } from 'react-router'
import '../index.css'
import { ReactComponent as ViewIcon } from '../styles/icons/조회_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/좋아요 비활성_18dp.svg'
import { ReactComponent as FullHeartIcon } from '../styles/icons/좋아요 활성_18dp.svg'
import { ReactComponent as CommentIcon } from '../styles/icons/댓글_18dp.svg'

const PostCard = ({ question }) => {
  const history = useHistory()

  const onC = () => {
    history.push(`/dict/question/detail/${question && question.questionId}`)
  }
  const [curiousTooCnt, setCuriousTooCnt] = useState(question.curiousTooCnt)
  const [isCuriousToo, setIsCuriousToo] = useState(question.isCuriousToo)
  const hour = question.createdAt.split('T')[1].split('.')[0]

  const handleClickCuriousToo = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCuriousToo) {
      await dictQuestionApi 
        .curiousToo(question.questionId)
        .then((response) => {
          console.log(response.data)
          setIsCuriousToo(false)
          console.log(isCuriousToo)
          setCuriousTooCnt(curiousTooCnt - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await dictQuestionApi
        .curiousToo(question.questionId)
        .then((response) => {
          console.log(response.data)
          setIsCuriousToo(true)
          setCuriousTooCnt(curiousTooCnt + 1)
          console.log(isCuriousToo)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }

  return (
    <>
      <FullWrap>
        <Wrap questionList={question} onClick={onC}>
          <UserInfo>
            <UserImg src={ question.profileImageUrl} alt="" />
            <div className="userinfo">
              <Writer>{ question.writer }</Writer>
              <div className="createdate">
                <CreatedAt>{ question.createdAt.split('T')[0] }</CreatedAt>
                <CreatedAt>{ hour.split(':')[0] + ':' + hour.split(':')[1] }</CreatedAt>
              </div>
            </div>
          </UserInfo>
          <Content>
            <Title>{question && question.title}</Title>
            {/* <HashTagHere>
              {question.hashTags &&
                question.hashTags.map((hashTag, index) => {
                  return <pre key={index}> #{hashTag}</pre>
                })}
            </HashTagHere> */}
          </Content>
          <Icon>
            <IconBox>
              <ViewIcon />
              <Number>{question && question.views}</Number>
            </IconBox>
            <IconBox>
              {isCuriousToo ? <FullHeartIcon onClick={handleClickCuriousToo} /> : <EmptyHeartIcon onClick={handleClickCuriousToo} />}
              <Number className="like-count">{curiousTooCnt}</Number>
            </IconBox>
            <IconBox>
              <CommentIcon />
              <Number>{question && question.commentCnt}</Number>
            </IconBox>
          </Icon>
        </Wrap>
        {question.thumbNail ? <ThumbNail className="uploadimg" src={question && question.thumbNail} alt="" /> : null}
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
