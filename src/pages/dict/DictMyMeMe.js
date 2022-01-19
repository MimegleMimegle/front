import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'

import '../../styles/css/DictMyMeme.css'
import styled from 'styled-components'

import { dictApi } from '../../shared/api'
import DictNavBar from '../../components/DictNavBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import DictMyScrapbook from '../../components/DictMyScrapbook'

const DictMyMeMe = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [scrapList, setScrapList] = React.useState([])

  const DictMySrcapListDB = async () => {
    let response = await dictApi.dictMyScrapList()

    setScrapList(response.data.data)
    console.log(response)
    console.log(response.data.data)
  }

  React.useEffect(() => {
    DictMySrcapListDB()
  }, [])

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
      <Footer />
    </>
  )
}

export default DictMyMeMe
