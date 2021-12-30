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

const DictList = (props) => {
  const dispatch = useDispatch()

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
    let response = await axios.get(`http://52.78.155.185/api/dict?page=${pageSize * (currentPage - 1)}&size=${pageSize}`)
    let totalLength = await dictApi.tellMeTotalLength()
    console.log(response)
    console.log(totalLength)
    setDict(response.data.data)
    setTotalCount(totalLength.data.data)
  }

  return (
    <>
      <div className="DictLayout">
        <SearchPage />
        <div className="NewDictAddButtonSection">
          <div className="NewDictAddButton" onClick={() => history.push('/dict/write')}>
            + 새로운 용어 등록하기
          </div>
        </div>
        <div className="DictList">
          {dict.map((dict) => (
            <div className="OneDictionaryCardList" key={dict.id}>
              <div className="OneDictionaryCardList WordCardList1">{dict.title}</div>
              <div className="OneDictionaryCardList WordCardList2">
                <button className="OneDictCardDetailButton" onClick={() => history.push(`/dict/detail/${dict.dictId}`)}>
                  자세히보기
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination simple total={totalCount} current={currentPage} pageSize={pageSize} onChange={(page) => setCurrentPage(page)} />
      </div>
    </>
  )
}

export default DictList
