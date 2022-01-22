import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { dictQuestionApi } from '../shared/api'
import { useHistory } from 'react-router'
import '../index.css'
import { ReactComponent as ViewIcon } from '../styles/icons/조회_18dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../styles/icons/size(28*28)(30*30)/heart_blank_28dp.svg'
import { ReactComponent as FullHeartIcon } from '../styles/icons/size(28*28)(30*30)/heart_filled_28dp.svg'
import { ReactComponent as CommentIcon } from '../styles/icons/댓글_18dp.svg'
import { ReactComponent as ICuriousToo } from '../styles/icons/quiz_black_24dp.svg'

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
          setIsCuriousToo(false)
          setCuriousTooCnt(curiousTooCnt - 1)
        })
        .catch((error) => {
          console.log('나도궁금해요 취소 문제 발생', error.response)
        })
    } else {
      await dictQuestionApi
        .curiousToo(question.questionId)
        .then((response) => {
          setIsCuriousToo(true)
          setCuriousTooCnt(curiousTooCnt + 1)
        })
        .catch((error) => {
          console.log('나도 궁금해요 문제 발생', error.response)
        })
    }
  }

  return (
    <>
      <FullWrap>
        <Wrap questionList={question} onClick={onC}>
          <Grid flex_align>
            <CuriousQ>Q</CuriousQ>
            <Title>{question && question.title}</Title>
          </Grid>
          {/* <div style={{ display: 'flex' }}> */}
          <Content>{question && question.content}</Content>
          {/* </div> */}
          <Icon>
            <IconBox>
              <ViewIcon fill="#878C92" />
              <Number>{question && question.views}</Number>
            </IconBox>
            <IconBox>
              {isCuriousToo ? <ICuriousToo fill="#00A0FF" onClick={handleClickCuriousToo} /> : <ICuriousToo fill="#878C92" onClick={handleClickCuriousToo} />}
              <Number className="like-count">{curiousTooCnt}</Number>
            </IconBox>
            <IconBox>
              <CommentIcon fill="#878C92" />
              <Number>{question && question.commentCnt}</Number>
            </IconBox>
          </Icon>
        </Wrap>
      </FullWrap>
    </>
  )
}

export default PostCard

const FullWrap = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  margin: 16px 0;
  width: 100%;
  height: fit-content;
  background-color: #fff;
`

const Wrap = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`

const CuriousQ = styled.div`
  background: #ff8e00;
  width: 40px;
  height: 40px;
  border: 2px solid black;
  border-radius: 150px;
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px 0 0;
`

const Title = styled.div`
  width: calc(100% - 52px);
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 500;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 24px;
  height: 48px;
  margin: 16px 0 0;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
`

const Number = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 300;
  margin: 0 9.5px 0 5px;
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0 0;
`
