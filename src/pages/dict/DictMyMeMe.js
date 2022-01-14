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
      <Header location="오픈 밈사전">
        <div
          className="DictPageSearchButton"
          onClick={() => {
            showSearchBar()
          }}
        >
          <SearchIcon style={{ margin: '0 5px 5px 0' }} />
        </div>
      </Header>
      <div className="DictLayout">
        <SearchBarSection>{show && <SearchPage />}</SearchBarSection>
        <div className="NewDictAddButtonSection">
          <div className="NewDictAddButton_1" onClick={() => history.push('/dict/write')}>
            밈 단어 등록
          </div>
          <div className="NewDictAddButton_2"></div>
        </div>
        <div className="DictNavBarSection">
          <DictNavBar />
        </div>
        <div className="MyDictMemeText">나의 밈 카드</div>
        <div className="MyDictMemeSection">
          <div className="MyDictMemeList">
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 170,
                  height: 150,
                },
              }}
            >
              <Paper elevation={3}>
                <div className="MyDictMemeCard">
                  <div className="MyDictMemeCard Title">Title</div>
                  <div className="MyDictMemeCard Summary">한줄요약</div>
                  <div className="MyDictMemeCard LikeCount">100</div>
                </div>
              </Paper>
              <Paper elevation={3} />
              <Paper elevation={3} />
              <Paper elevation={3} />
            </Box>
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
  z-index: 5;
`

export default DictMyMeMe
