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

  const keyword = props

  const [result, setResult] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  React.useEffect(() => {
    searchDictDB()
  }, [currentPage])

  console.log(result)
  console.log(totalCount)

  const searchDictDB = async () => {
    let response = await axios.get(`/api/dict/search?q=${keyword}&page=${pageSize * (currentPage - 1)}&size=${pageSize}`)
    let totalLength = await dictApi.tellMeTotalLength()
    console.log(response)
    console.log(totalLength)
    setResult(response.data.data)
    setTotalCount(totalLength.data.data)
  }

  return (
    <>
      <div className="DictSearchPageLayout">
        <SearchPage />
        <div className="DictSearchListSection"></div>
        <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
      </div>
    </>
  )
}

export default DictSearch
