import React, { useState, useEffect } from 'react'
import '../../styles/css/DictList.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import axios from 'axios'
// import OneDictionaryCard from '../../components/OneDictionaryCard'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'

const DictList = (props) => {
  const dispatch = useDispatch()

  // const dictId = Number(props.match.params.dictId)

  const [dict, setDict] = useState([])
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState()

  const handlePageChange = (page) => {
    setDict({ ...setDict, Page: page })
  }

  React.useEffect(() => {
    getDictListDB()
  }, [page])

  console.log(dict)

  const getDictListDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/dict?page=0&size=10`)
    console.log(response)
    setDict(response.data.data)
    setTotalCount(response.data.total)
  }

  return (
    <>
      <div className="DictLayout">
        <div className="NewDictAddButtonSection">
          <div className="NewDictAddButton" onClick={() => history.push('/dict/write')}>
            + 새로운 용어 등록하기
          </div>
        </div>
        <div className="DictList">
<<<<<<< HEAD
          {dict.map((d) => {
            return (
              <div className="OneDictionaryCard" key={d.id}>
                <div className="OneDictionaryCard Card1">{d.title}</div>
                <div className="OneDictionaryCard Card2"></div>
              </div>
            )
          })}
=======
          {dict.map((dict) => (
            <div className="OneDictionaryCardList" key={dict.id}>
              <div className="OneDictionaryCardList WordCardList1">{dict.title}</div>
              <div className="OneDictionaryCardList WordCardList2"></div>
            </div>
          ))}
>>>>>>> 06e6973 ([Feat]용어사전 작성 및 페이지네이션)
        </div>
        <Pagination simple page={page} total={totalCount} size={size} onChange={(page) => setPage(page)} />
      </div>
    </>
  )
}

export default DictList
