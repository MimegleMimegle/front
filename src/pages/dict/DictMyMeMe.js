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
import Title from '../../elements/Title'
import Grid from '../../elements/Grid'

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
        <DictNavBar />
        <Grid padding="24px 16px 10px">
          <Title>내가 스크랩한 목록</Title>
        </Grid>
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
