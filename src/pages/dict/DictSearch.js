import React, { useState, useEffect } from 'react'
import '../../styles/css/DictList.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
// import OneDictionaryCard from '../../components/OneDictionaryCard'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'
import History from '../../shared/SearchHistory'
import SearchBar from '../../shared/SearchBar'
import { dictApi } from '../../shared/api'
import Header from '../../components/Header'

const DictSearch = ({ onAddKeyword }, props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState(JSON.parse(localStorage.getItem('keywords') || '[]'))

  //keyword에 변화가 일어날때만 랜더링
  useEffect(() => {
    //array 타입을 string형태로 바꾸기 위해 json.stringfy를 사용한다.
    localStorage.setItem('keywords', JSON.stringify(keywords))
  }, [keywords])

  //state를 다루는 함수는 handle 보통 많이 붙인다.

  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const searchDictDB = async () => {
    let response = await dictApi.searchDict(keyword, pageSize, currentPage)
    let searchTotalLength = await dictApi.tellMeTotalLengthSearch(keyword)

    setKeyword(response.data.data)
    setTotalCount(searchTotalLength.data.data)

    console.log(response)
  }

  React.useEffect(() => {
    searchDictDB()
  }, [currentPage])

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  //검색어 추가
  const handleAddKeyword = (text) => {
    console.log('text', text)
    const newKeyword = {
      id: Date.now(),
      text: text,
    }
    setKeywords([newKeyword, ...keywords])
  }

  //검색어 삭제
  const handleRemoveKeyword = (id) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id !== id
    })
    setKeywords(nextKeyword)
  }

  //검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([])
  }

  console.log(keyword)

  return (
    <>
      <Header type="DictSearchResult" location="오픈 밈사전">
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
      {show && (
        <SearchBarPage>
          <SearchBar onAddKeyword={handleAddKeyword}></SearchBar>
          <History keywords={keywords} onClearKeywords={handleClearKeywords} onRemoveKeyword={handleRemoveKeyword} />
        </SearchBarPage>
      )}
      <div className="DictSearchPageLayout">
        <div className="DictSearchListSection"></div>
        <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
      </div>
    </>
  )
}

const SearchBarPage = styled.div`
  width: 100%;
  height: fit-content;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-bottom: 0.5px solid rgba(229, 229, 229, 1);
  position: relative;
  overflow: auto;

  z-index: 10;
`

export default DictSearch
