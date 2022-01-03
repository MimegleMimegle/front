import React, { useState, useEffect } from 'react'
import '../../styles/css/DictHistory.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import { dictApi } from '../../shared/api'

const DictEditHistory = (props) => {
  const dispatch = useDispatch()

  const [dictHistory, setDictHistory] = useState([])
  const dictId = Number(props.match.params.dictId)

  console.log(dictId)

  React.useEffect(() => {
    getDictHistoryDB()
  }, [])

  console.log(dictHistory)

  const getDictHistoryDB = async () => {
    let response = await dictApi.dictEditHistory()

    console.log(response)
    setDictHistory(response.data.data)
  }

  return (
    <>
      <div className="DictHistoryPageLayout">
        <div className="DictHistoryListText">{dictId.title}의 편집기록</div>
        <div className="DictHistoryListSection">
          {dictHistory.map((dictId) => (
            <div className="DictHistoryList" key={dictId.id} onClick={() => history.push(`/dict/detail/${dictId.dictId}`)}>
              <div className="DictHistoryList DictWriterInfo">{dictId.modifier} 님의 편집 내역</div>
              <div className="DictHistoryList DictHistoryCreatedAt">편집일 : {dictId.createdAt}</div>
            </div>
          ))}
          <div className="DictHistoryList DictHistoryFirstWriter">{dictHistory.firstWriter} 님의 단어 등록</div>
          <div className="DictHistoryList DictHistoryFirstCreatedAt">등록일 : {dictHistory.createdAt}</div>
        </div>
      </div>
    </>
  )
}

export default DictEditHistory
