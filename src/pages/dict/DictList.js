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
import { ReactComponent as EmptyBookMarkIcon } from '../../styles/icons/북마크 비활성_18dp.svg'
import { ReactComponent as FillBookMarkIcon } from '../../styles/icons/북마크 활성_18dp.svg'
import { ReactComponent as SearchIcon } from '../../styles/icons/검색_24dp.svg'

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
        <div className="DictPageSearchSection">
          <div
            className="DictPageSearchButton"
            onClick={() => {
              showSearchBar()
            }}
          > */}
        <SpeedDialButton />
        </div>
        </div> */}
        <div className="DictNavBarSection">
          <DictNavBar />
        </div>
        <SearchBarSection>
          <SearchPage />
        </SearchBarSection>
        {/* <div className="NewDictAddButtonSection">
          <div className="NewDictAddButton_1" onClick={() => history.push('/dict/write')}>
            밈 단어 등록
          </div>
          <div className="NewDictAddButton_2"></div>
        </div> */}
        <div className="TodayDictListGuide">
          <div className="TodayDictListText">오늘의 밈 카드</div>
          <div className="TodayDictListDot" />
        </div>
        <TodayDictCardSwiper />
        <div className="DictListPagination">
          <div className="DictListGuide">
            <div className="DictListText">밈 목록</div>
            <div className="DictListDot" />
          </div>
          <div className="DictList">
            {dict.map((dict) => (
              <div className="OneDictionaryCardSection">
                <div className="OneDictionaryCardList" key={dict.id} onClick={() => history.push(`/dict/detail/${dict.dictId}`)}>
                  <div className="DictListTitle">{dict.title}</div>
                  <div className="DictListSummary">{dict.summary}</div>
                  <div className="DictWriteInfo">
                    <Grid flex_align>
                      {dict.like ? <FillBookMarkIcon fill="#878c92" /> : <EmptyBookMarkIcon fill="#878c92" />}
                      <div className="DictListLikeCount">{dict.likeCount}</div>
                    </Grid>
                    <Grid flex_end>
                      <div className="DictListFirstWriter">{dict.firstWriter}</div>
                      <div className="DictListCreatedAt">{dict.createdAt.split('T', 1)}</div>
                    </Grid>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
        </div>
      </div>
      <Footer />
    </>
  )
}

const SearchBarSection = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'YdestreetL';
  font-style: normal;
  font-weight: normal;
`

export default DictList
