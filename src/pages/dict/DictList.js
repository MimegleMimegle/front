import React, { useState, useEffect } from 'react'
import '../../styles/css/DictList.css'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { dictApi } from '../../shared/api'
import DictNavBar from '../../components/DictNavBar'
import SpeedDialButton from '../../components/SpeedDialButton'
import TodayDictCardSwiper from '../../components/TodayDictCardSwiper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Grid from '../../elements/Grid'
import Title from '../../elements/Title'
import OneDictionaryCard from '../../components/OneDictionaryCard'
import ConfirmModal from '../../components/modal/ConfirmModal'
import { ReactComponent as EmptyBookMarkIcon } from '../../styles/icons/bookmark_blank.svg'
import { ReactComponent as FillBookMarkIcon } from '../../styles/icons/bookmark_filled.svg'
import { RiEditLine } from 'react-icons/ri'

const DictList = (props) => {
  const dispatch = useDispatch()

  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dict, setDict] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [like, setLike] = useState(false)

  const [showModal, setShowModal] = useState(false)

  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
    getDictListDB()
  }, [currentPage])

  const getDictListDB = async () => {
    let response = await dictApi.getDictMain(pageSize, currentPage)
    let totalLength = await dictApi.tellMeTotalLength()

    setDict(response.data.data)
    setTotalCount(totalLength.data.data)
  }

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleClickWrite = () => {
    if (!isLogin) {
      setShowModal(true)
    } else {
      history.push('/dict/write')
    }
  }

  return (
    <>
      <Header location="오픈 밈사전"></Header>
      <div className="DictLayout">
        <DictNavBar />
        <SearchBarSection>
          <SearchPage />
        </SearchBarSection>
        <div className="TitleBox">
          <Title>인기 밈</Title>
        </div>
        <Grid padding="10px 16px 16px">
          <TodayDictCardSwiper />
        </Grid>
        <div className="DictListPagination">
          <div className="TitleBox">
            <Title>밈 목록</Title>
          </div>
          <div className="DictList">
            {dict.map((dict) => (
              <OneDictionaryCard key={dict.id} dict={dict} />
            ))}
          </div>
          <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
        </div>
      </div>
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

const SearchBarSection = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px 16px;
`

const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default DictList
