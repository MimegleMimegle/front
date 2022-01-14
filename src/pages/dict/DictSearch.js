import React, { useState, useEffect } from 'react'
import '../../styles/css/DictSearch.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { dictApi } from '../../shared/api'
import Header from '../../components/Header'

const DictSearch = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const keyword = props.match.params.keyword
  const [searchResult, setSearchResult] = useState([])

  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const searchDictDB = async () => {
    let response = await dictApi.searchDict(keyword, pageSize, currentPage)
    // let searchTotalLength = await dictApi.tellMeTotalLengthSearch(keyword)

    setSearchResult(response.data.data)
    setTotalCount(response.data.data.length)
  }

  React.useEffect(() => {
    searchDictDB(keyword)
    setShow(false)
  }, [currentPage])

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const notKeyword = totalCount === 0

  return (
    <>
      <Header location="오픈 밈사전">
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
      <SearchBarSection>{show && <SearchPage />}</SearchBarSection>
      <div className="DictSearchPageLayout">
        <div className="DictSearchResultText">"{keyword}"에 대한 검색결과</div>
        {notKeyword ? (
          <div className="DictSearchListSection">
            <div className="DictSearchNoResult">검색결과가 없습니다</div>
          </div>
        ) : (
          ''
        )}
        {notKeyword ? <div className="DictSearchNoResultAddDictGuideText">새로운 단어를 직접 추가해주세요!</div> : ''}
        {notKeyword ? (
          ''
        ) : (
          <div className="DictSearchLists">
            {searchResult.map((searchResult) => (
              <div className="DictSearchList" key={searchResult.id} onClick={() => history.push(`/dict/detail/${searchResult.dictId}`)}>
                <div className="DictSearchList SearchDictListTitle">{searchResult.title}</div>
                <div className="DictSearchList SearchDictListSummary">{searchResult.summary}</div>
                <div className="DictSearchList SearchDictWriteInfo">
                  <div className="DictSearchList SearchDictListLikeButton">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="40px" fill="#000000">
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                    </svg>
                  </div>
                  <div className="DictSearchList SearchDictListLikeCount">{searchResult.likeCount}</div>
                  <div className="DictSearchList SearchDictListFirstWriter">{searchResult.firstWriter}</div>
                  <div className="DictSearchList SearchDictListCreatedAt">{searchResult.createdAt.split('T', 1)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {notKeyword ? (
          <div className="DictSearchNoResult_AddDictButtonSection">
            <div
              className="DictSearchNoResult_AddDictButton"
              onClick={() => {
                history.push('/dict/write')
              }}
            >
              <div className="DictSearchNoResult_AddDictButton_1">단어 추가</div>
              <div className="DictSearchNoResult_AddDictButton_2"></div>
            </div>
          </div>
        ) : (
          ''
        )}
        {notKeyword ? '' : <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />}
      </div>
    </>
  )
}

const SearchBarSection = styled.div`
  position: absolute;
  top: 74px;
  width: 100%;
  height: fit-content;
  z-index: 5;
`

export default DictSearch
