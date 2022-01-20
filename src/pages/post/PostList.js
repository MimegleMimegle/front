import React, { useEffect, useState } from 'react'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
import PostCard from '../../components/PostCard'
import Pagination from 'rc-pagination'
import { dictQuestionApi } from '../../shared/api'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DictNavBar from '../../components/DictNavBar'
import SearchPost from '../../components/SearchPost'

import '../../index.css'

import { ReactComponent as CloseIcon } from '../../styles/icons/X_24dp.svg'
import { ReactComponent as SearchIcon } from '../../styles/icons/검색_24dp.svg'
import { CircularProgress } from '@mui/material'
import { RiEditLine } from 'react-icons/ri'
import SpeedDialButton from '../../components/SpeedDialButton'


const PostList = (props) => {
  const [question, setQuestion] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 400)
    getQuestionListDB()
  }, [currentPage])

  const getQuestionListDB = async () => {
    let response = await dictQuestionApi.getQuestions(pageSize, currentPage)
    let totalLength = await dictQuestionApi.totalLength()
    setQuestion(response.data.data)
    setTotalCount(totalLength.data.data)
    console.log(response.data.data)
  }

  return (
    <>
      <Header location="밈 사전" />
      {!loading ? (
        <>
          <Container>
            <Wrap>
               <DictNavBar />
              <div className='curious'>궁금해요!</div>
              {question &&
                question.map((question, index) => {
                  return <PostCard question={question} key={question.questionId} />
                })}

              <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
            </Wrap>
          </Container>
        </>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <Footer />
      <SpeedDialButton _onClick={() => history.push('/dict/question/write')}>
        <RiEditLine size="28" fill="#FFFFFF" />
      </SpeedDialButton>
    </>
  )
}

export default PostList

const Container = styled.div`
  padding: 56px 0 0;
  position: relative;
`

const SearchPostDiv = styled.div`
  width: 100%;
  position: absolute;
  z-index: 5;
`

const Wrap = styled.div`
  /* position: absolute; */
  width: 100%;
  padding: 0 0 80px;
  .curious {
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    display: flex;
    align-items: center;
    margin:24px 16px 16px 16px;
  }
`

const Empty = styled.div`
  border-bottom: 1px solid #e5e5e5;
  /* position: relative; */
  /* display: flex; */
  /* justify-content: center; */
`

const Addbtn = styled.div`
  width: 280px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.blue};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
  z-index: 2;
  /* transform: translateX(-50%); */
  margin: 15px 0 30px 0;
  transition-duration: 0.2s;
  &:hover {
    left: calc(50%);
    transform: translate(4px, 10%);
  }
`

const AddbtnShadow = styled.div`
  width: 280px;
  height: 40px;
  top: 19px;
  left: calc(50%);
  transform: translateX(calc(-50% + 4px));
  background-color: white;
  border: 1px solid black;
  position: absolute;
  z-index: -1;
`