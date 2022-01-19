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
import { ReactComponent as EmptyBookMarkIcon } from '../../styles/icons/북마크 비활성_18dp.svg'
import { ReactComponent as FillBookMarkIcon } from '../../styles/icons/북마크 활성_18dp.svg'
import { ReactComponent as SearchIcon } from '../../styles/icons/검색_24dp.svg'
import { RiEditLine } from 'react-icons/ri'

const DictList = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const [dict, setDict] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [like, setLike] = useState(false)

  React.useEffect(() => {
    getDictListDB()
  }, [currentPage])

  console.log(dict)
  console.log(totalCount)

  const getDictListDB = async () => {
    let response = await dictApi.getDictMain(pageSize, currentPage)
    let totalLength = await dictApi.tellMeTotalLength()
    console.log(response)
    console.log(totalLength)
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

  return (
    <>
      <Header location="오픈 밈사전"></Header>
      <div className="DictLayout">
        <DictNavBar />
        <SearchBarSection>
          <SearchPage />
        </SearchBarSection>
        <div className="TitleBox">
          <Title>오늘의 밈 카드</Title>
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
      <SpeedDialButton _onClick={() => history.push('/dict/write')}>
        <RiEditLine size="28" fill="#FFFFFF" />
      </SpeedDialButton>
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

export default DictList
