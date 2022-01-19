import React, { useState, useEffect } from 'react'
import '../../styles/css/DictHistory.css'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import { dictApi } from '../../shared/api'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SearchPage from '../../shared/SearchPage'

const DictEditHistory = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const dictId = Number(props.match.params.dictId)
  const [isDict, setIsDict] = useState([])
  const [dictHistory, setDictHistory] = useState([])
  const [firstCreatedAt, setFirstCreatedAt] = useState('')

  console.log(dictId)

  React.useEffect(() => {
    getDictHistoryDB()
  }, [])

  console.log(dictHistory)

  const getDictHistoryDB = async () => {
    const dictId = Number(props.match.params.dictId)
    let response = await dictApi.dictEditHistory(dictId)

    console.log(response)
    setIsDict(response.data.data)
    setDictHistory(response.data.data.history)
    setFirstCreatedAt(response.data.data.firstCreatedAt.split('T')[0])
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
      <Header type="goBack" location="오픈 밈사전" />
      <SearchBarSection>{show && <SearchPage />}</SearchBarSection>
      <div className="DictHistoryPageLayout">
        <div className="DictHistoryListText">"{isDict.title}"에 대한 편집기록</div>
        <div className="DictHistoryListSection">
          {dictHistory.map((dictId) => (
            <div className="DictHistoryList" key={dictId.id}>
              <div className="DictHistoryList DictWriterInfo">
                <img className="DictHistoryList DictWriterProfileImage" src={dictId.writerProfileImage} />
                <div className="DictHistoryList DictWriter">{dictId.writer} 님의 편집 내역</div>
              </div>
              <div className="DictHistoryList DictHistoryCreatedAt">편집일 : {dictId.createdAt.split('T', 1)}</div>
            </div>
          ))}
          <div className="DictHistoryList">
            <div className="DictHistoryList DictHistoryFirstWriterInfo">
              <img className="DictHistoryList DictFirstWriterProfileImage" src={isDict.firstWriterProfileImage} />
              <div className="DictHistoryList DictHistoryFirstWriter">{isDict.firstWriter} 님의 단어 등록</div>
            </div>
            <div className="DictHistoryList DictHistoryFirstCreatedAt">등록일 : {firstCreatedAt}</div>
          </div>
        </div>
        <div className="DictHistoryModifiedDictGuideTextAndButton">
          <div className="DictHistoryModifiedDictGuideText">직접 단어의 뜻을 업데이트 할 수 있어요!</div>
          <div
            className="DictHistoryModifiedButton"
            onClick={() => {
              history.push(`/dict/edit/${dictId}`)
            }}
          >
            <div className="DictHistoryModifiedButton_1">편집하기</div>
            <div className="DictHistoryModifiedButton_2"></div>
          </div>
        </div>
      </div>
      <Footer />
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

export default DictEditHistory
