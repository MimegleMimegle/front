import React, { useState, useEffect } from 'react'
import '../../styles/css/DictSearch.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'
import { dictApi } from '../../shared/api'
import Header from '../../components/Header'
import OneDictionaryCard from '../../components/OneDictionaryCard'
import PostCard from '../../components/PostCard'
import Title from '../../elements/Title'
import Grid from '../../elements/Grid'

const DictSearch = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const keyword = props.match.params.keyword
  const [dictResult, setDictResult] = useState([])
  const [questionResult, setQuestionResult] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCountDict, setTotalCountDict] = useState('')
  const [totalCountQnA, setTotalCountQnA] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const searchDictDB = async () => {
    let response = await dictApi.searchDict(keyword, pageSize, currentPage)
    // let searchTotalLength = await dictApi.tellMeTotalLengthSearch(keyword)

    setDictResult(response.data.data.dictResult)
    setQuestionResult(response.data.data.questionResult)
    setTotalCountDict(response.data.data.dictResult.length)
    setTotalCountQnA(response.data.data.questionResult.length)

    console.log(response)
    console.log(response.data.data.dictResult)
    console.log(response.data.data.questionResult)
    console.log(response.data.data.dictResult.length)
    console.log(response.data.data.questionResult.length)
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

  const notResultDict = totalCountDict === 0
  const notResultQnA = totalCountQnA === 0

  return (
    <>
      <Header type="goBack" location="오픈 밈사전" />
      <div className="DictSearchPageLayout">
        <div className="DictSearchResultText">"{keyword}"에 대한 검색결과</div>
        <Grid flex_start column>
          <Grid padding="0 16px">
            <Title>오픈 밈 사전</Title>
          </Grid>
          {notResultDict ? (
            <>
              <Grid flex_start column height="100%" padding="16px 0 0">
                <div className="DictSearchListSection">
                  <div className="DictSearchNoResult">검색결과가 없습니다.</div>
                </div>
                <div className="DictSearchNoResultAddDictGuideText">새로운 단어를 직접 추가해주세요!</div>
                <Grid flex_center padding="30px">
                  <div
                    className="DictSearchNoResult_AddDictButton"
                    onClick={() => {
                      history.push('/dict/write')
                    }}
                  >
                    <div className="DictSearchNoResult_AddDictButton_1">단어 추가</div>
                    <div className="DictSearchNoResult_AddDictButton_2"></div>
                  </div>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {dictResult.map((dict) => (
                <OneDictionaryCard key={dict.id} dict={dict} />
              ))}
            </>
          )}
        </Grid>
        <div className="DictSearchResultQnASection">
          <Grid padding="0 16px">
            <Title>궁금해요</Title>
          </Grid>
          {notResultQnA ? (
            <>
              <Grid flex_start column height="100%" padding="16px 0 0">
                <div className="DictSearchListSection">
                  <div className="DictSearchNoResult">검색결과가 없습니다.</div>
                </div>
                <div className="DictSearchNoResultAddDictGuideText">원하는 검색 결과가 없으신가요?</div>
                <Grid flex_center padding="30px 0">
                  <div
                    className="DictSearchNoResult_AddDictButton"
                    onClick={() => {
                      history.push('/dict/question/write')
                    }}
                  >
                    <div className="DictSearchNoResult_AddDictButton_1">질문하기</div>
                    <div className="DictSearchNoResult_AddDictButton_2"></div>
                  </div>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {questionResult.map((question) => (
                <PostCard key={question.boardId} question={question} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default DictSearch
