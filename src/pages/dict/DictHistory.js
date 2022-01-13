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
      <Header type="DictHistory" location="오픈 밈사전">
        <div
          className="DictPageSearchButton"
          onClick={() => {
            showSearchBar()
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </Header>
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
