import React, { useState, useEffect } from 'react'
import '../../styles/css/DictList.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
// import OneDictionaryCard from '../../components/OneDictionaryCard'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { dictApi } from '../../shared/api'
import TodayDictCardSwiper from '../../components/TodayDictCardSwiper'
import Header from '../../components/Header'

const DictList = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const [dict, setDict] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  React.useEffect(() => {
    getDictListDB()
  }, [currentPage])

  console.log(dict)
  console.log(totalCount)

  const getDictListDB = async () => {
    let response = await axios.get(`http://54.180.150.230/api/dict?page=${pageSize * (currentPage - 1)}&size=${pageSize}`)
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
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </Header>
      <div className="DictLayout">
        {show && <SearchPage />}
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
                    <div className="OneDictionaryCardList DictListLikeButton">
                      <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="40px" fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                      </svg>
                    </div>
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
    </>
  )
}

export default DictList
