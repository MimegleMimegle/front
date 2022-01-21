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
import SpeedDialButton from '../../components/SpeedDialButton'
import Grid from '../../elements/Grid'
import '../../index.css'
import ConfirmModal from '../../components/modal/ConfirmModal'
import Title from '../../elements/Title'
import SearchPage from '../../shared/SearchPage'

import { ReactComponent as CloseIcon } from '../../styles/icons/X_24dp.svg'
import { ReactComponent as SearchIcon } from '../../styles/icons/검색_24dp.svg'
import { CircularProgress } from '@mui/material'
import { RiEditLine } from 'react-icons/ri'
import { IoSearchCircleSharp } from 'react-icons/io5'

const PostList = (props) => {
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  const [question, setQuestion] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

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

  const handleClickWrite = () => {
    if (!isLogin) {
      setShowModal(true)
    } else {
      history.push('/dict/question/write')
    }
  }

  return (
    <>
      <Header location="밈 사전" />
      <Container>
        <DictNavBar />
        <SearchBarSection>
          <SearchPage />
        </SearchBarSection>
        <Wrap>
          {!loading ? (
            <>
              <CuriousHelp>
                <Title>궁금해요!</Title>
                {/* <div className="curious">궁금해요!</div> */}
                <div className="wait">답변을 기다리고 있어요~</div>
              </CuriousHelp>
              {question &&
                question.map((question, index) => {
                  return <PostCard question={question} key={question.questionId} />
                })}

              <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
            </>
          ) : (
            <Grid flex_center height="100%">
              <CircularProgress color="inherit" />
            </Grid>
          )}
          <Grid height="90px"></Grid>
        </Wrap>
      </Container>
      <Footer />
      <SpeedDialButton _onClick={handleClickWrite}>
        <RiEditLine size="28" fill="#FFFFFF" />
      </SpeedDialButton>
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용 가능합니다!" question="로그인 페이지로 이동하시겠어요?">
        <MoveLoginButton onClick={() => history.push('/login')}>이동</MoveLoginButton>
      </ConfirmModal>
    </>
  )
}

export default PostList

const Container = styled.div`
  padding: 56px 0 0;
  height: 100%;
  position: relative;
`
const SearchBarSection = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px 16px;
`

const Wrap = styled.div`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  padding: 16px 16px 0;
`
const CuriousHelp = styled.div`
  display: flex;
  margin: 0 0 16px;
  .curious {
    font-family: 'YdestreetL';
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    display: flex;
    align-items: center;
  }
  .wait {
    font-size: ${({ theme }) => theme.fontSizes.base};
    display: flex;
    align-items: center;
    margin: 0 0 0 8px;
  }
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
const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`
