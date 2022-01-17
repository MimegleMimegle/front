import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'

import '../../styles/css/DictMyMeme.css'
import styled from 'styled-components'
import { ReactComponent as SearchIcon } from '../../styles/icons/검색_24dp.svg'

import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { dictApi } from '../../shared/api'
import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import DictMyScrapbook from '../../components/DictMyScrapbook'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const DictMyMeMe = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const [dict, setDict] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [like, setLike] = useState(false)

  React.useEffect(() => {
    getDictListDB()
  }, [currentPage])

  console.log(dict)
  console.log(totalCount)

  const getDictListDB = async () => {
    let response = await dictApi.getDictMain(pageSize, currentPage)
    let totalLength = await dictApi.tellMeTotalLength()
    console.log(response)
    console.log(totalLength)
    setDict(response.data.data)
    setTotalCount(totalLength.data.data)
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
      <Header location="오픈 밈사전"></Header>
      <div className="DictLayout">
        <div className="DictNavBarSection">
          <DictNavBar />
        </div>
        <div className="MyDictMemeGuide">
          <div className="MyDictMemeText">내가 스크랩한 목록</div>
          <div className="MyDictMemeDot" />
        </div>
        <div className="MyDictMemeSection">
          <div className="MyDictMemeList">
            <DictMyScrapbook />
          </div>
        </div>
      </div>
    </>
  )
}

const SearchBarSection = styled.div`
  position: absolute;
  width: 100%;
  height: fit-content;
`

export default DictMyMeMe
