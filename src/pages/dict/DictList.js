import React, { useState, useEffect } from 'react'
import '../../styles/css/DictList.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import OneDictionaryCard from '../../components/OneDictionaryCard'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'

const DictList = (props) => {
  const dispatch = useDispatch()

  const [dict, setDict] = useState([])
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(100)

  const handlePageChange = (page) => {
    setDict({ ...setDict, Page: page })
  }

  React.useEffect(() => {
    getDictListDB()
  }, [page])

  const getDictListDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/dict?page=0&size=10`)
    console.log(response)
    setDict(response.data.data)
    setTotalCount(response.data.total)
  }

  return (
    <>
      <div className="DictLayout">
        <div className="DictList">
          {dict.map((dict) => (
            <div className="OneDictionaryCard" key={dict.id}>
              <div className="OneDictionaryCard Card1">{dict.title}</div>
              <div className="OneDictionaryCard Card2"></div>
            </div>
          ))}
        </div>
        <Pagination simple page={page} total={totalCount} size={size} onChange={(page) => setPage(page)} />
      </div>
    </>
  )
}

export default DictList
