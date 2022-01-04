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

const DictSearch = (props) => {
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const [filteredDict, setFilteredDict] = React.useState([])
  const [notFound, setNotFound] = React.useState(false)

  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const searchDictDB = async () => {
    let response = await dictApi.searchDict(keyword, pageSize, currentPage)
    let searchTotalLength = await dictApi.tellMeTotalLengthSearch(keyword)

    console.log(response.data.data)
    console.log(searchTotalLength)
    setFilteredDict(response.data.data)
    setTotalCount(searchTotalLength.data.data)
  }

  React.useEffect(() => {
    searchDictDB()
  }, [currentPage])

  console.log(filteredDict)
  console.log(totalCount)

  return (
    <>
      <div className="DictSearchPageLayout">
        <SearchPage />
        <div className="DictSearchListSection">
          {filteredDict.map((dictId) => (
            <div className="OneDictionaryCardSection">
              <div className="OneDictionaryCardList" key={filteredDict.id} onClick={() => history.push(`/dict/detail/${filteredDict.dictId}`)}>
                <div className="OneDictionaryCardList DictListTitle">{filteredDict.title}</div>
                <div className="OneDictionaryCardList DictListSummary">{filteredDict.summary}</div>
                <div className="OneDictionaryCardList DictWriteInfo">
                  {/* <div className="OneDictionaryCardList DictListFirstWriter">{result.firstWriter}</div>
                  <div className="OneDictionaryCardList DictListCreatedAt">{result.createdAt}</div> */}
                  <div className="OneDictionaryCardList DictListLikeButton">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="40px" fill="#000000">
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                    </svg>
                  </div>
                  <div className="OneDictionaryCardList DictListLikeCount">{filteredDict.likeCount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
      </div>
    </>
  )
}

export default DictSearch
