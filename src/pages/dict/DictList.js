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
import TodayDictCardSwiper from '../../components/TodayDictCardSwiper'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ReactComponent as EmptyLikeIcon } from '../../styles/icons/좋아요 비활성_18dp.svg'
import { ReactComponent as FillLikeIcon } from '../../styles/icons/좋아요 활성_18dp.svg'
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
      <Header type="DictList" location="오픈 밈사전">
        <div
          className="DictPageSearchButton"
          onClick={() => {
            showSearchBar()
          }}
        >
          <SearchIcon style={{ margin: '0 5px 5px 0' }} />
        </div>
      </Header>
      <div className="DictLayout">
        <SearchBarSection>{show && <SearchPage />}</SearchBarSection>
        <div className="NewDictAddButtonSection">
          <div className="NewDictAddButton_1" onClick={() => history.push('/dict/write')}>
            밈 단어 등록
          </div>
          <div className="NewDictAddButton_2"></div>
        </div>
        <div className="TodayDictListText">오늘의 밈 카드</div>
        <hr className="TodayDictListHr" />
        <TodayDictCardSwiper />
        <div className="DictListPagination">
          <div className="DictListText">밈 목록</div>
          <div className="DictList">
            {dict.map((dict) => (
              <div className="OneDictionaryCardSection">
                <div className="OneDictionaryCardList" key={dict.id} onClick={() => history.push(`/dict/detail/${dict.dictId}`)}>
                  <div className="OneDictionaryCardList DictListTitle">{dict.title}</div>
                  <div className="OneDictionaryCardList DictListSummary">{dict.summary}</div>
                  <div className="OneDictionaryCardList DictWriteInfo">
                    <div className="OneDictionaryCardList DictListLikeButton">{dict.like ? <FillLikeIcon /> : <EmptyLikeIcon />}</div>
                    <div className="OneDictionaryCardList DictListLikeCount">{dict.likeCount}</div>
                    <div className="OneDictionaryCardList DictListFirstWriter">{dict.firstWriter}</div>
                    <div className="OneDictionaryCardList DictListCreatedAt">{dict.createdAt.split('T', 1)}</div>
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
  position: absolute;
  width: 100%;
  height: fit-content;
  z-index: 5;
`

export default DictList
