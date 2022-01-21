import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dictQuestionApi } from '../shared/api'
import { useHistory } from 'react-router'
import '../index.css'
import { ReactComponent as ViewIcon } from '../styles/icons/조회_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/하트 비활성_24dp.svg'
import { ReactComponent as FullHeartIcon } from '../styles/icons/하트 활성_24dp.svg'
import { ReactComponent as CommentIcon } from '../styles/icons/댓글_18dp.svg'
import { BiBadge, BiBadgeCheck } from 'react-icons/bi'
import Grid from '../elements/Grid'

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
          <Grid flex_align>
            <CuriousQ>Q</CuriousQ>
            {/* <UserImg src={question.profileImageUrl} alt="" /> */}
            <div className="profile-box">
            <Title>{question && question.title}</Title>

              {/* <Writer>{question.writer}</Writer> */}
              {/* <div className="created-date">
                <CreatedAt>{question.createdAt.split('T')[0]}</CreatedAt>
                <CreatedAt>{hour.split(':')[0] + ':' + hour.split(':')[1]}</CreatedAt>
              </div> */}
            </div>
          </Grid>
          <Content>{question&&question.content}</Content>
          {/* <Title>{question && question.title}</Title> */}
          <Icon>
            <IconBox>
              <ViewIcon fill="#333" />
              <Number>{question && question.views}</Number>
            </IconBox>
            <IconBox>
              {isCuriousToo ? <FullHeartIcon fill="#333" onClick={handleClickCuriousToo} /> : <EmptyHeartIcon fill="#333" onClick={handleClickCuriousToo} />}
              <Number className="like-count">{curiousTooCnt}</Number>
            </IconBox>
            <IconBox>
              <CommentIcon fill="#333" />
              <Number>{question && question.commentCnt}</Number>
            </IconBox>
            {/* <IconBox>{question.isComplete ? <BiBadgeCheck size="20" /> : <BiBadge size="20" />}</IconBox> */}
          </Icon>
        </Wrap>
        {/* {question.thumbNail ? (
          <ThumbNailContainer>
            <ThumbNail className="uploadimg" src={question && question.thumbNail} alt="" />
          </ThumbNailContainer>
        ) : null} */}
      </FullWrap>
    </>
  )
}

export default PostCard

const FullWrap = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border:2px solid black;
  margin: 16px;
  width: 398px;
  height: 170px;
`

const Wrap = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  .profile-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .created-date {
      width: 100%;
      display: flex;
    }
  }
`

const CuriousQ = styled.div`
  background: #FF8E00;
  width: 40px;
  height:40px;
  border: 2px solid black;
  border-radius:150px;
  font-family:'YdestreetB';
  font-syled: normal;
  font-weigt:bold;
  line-height:26px;
  font-size:20px;
  padding:7px 11px 7px 9px;

`

const UserImg = styled.div`
  margin: 0 10px 0 0;
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`
const Writer = styled.p`
  width: 100%;
  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.fontSizes.base};
`

const CreatedAt = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin: 0 5px 0 0;
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  margin: 0 12px;
`

const Content = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  margin:16px 0;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
`

const Number = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: #333;
  margin: 0 9.5px 0 5px;
`

const ThumbNailContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const ThumbNail = styled.img`
  width: 80px;
  height: 80px;
`
const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin:16px 0;
`
