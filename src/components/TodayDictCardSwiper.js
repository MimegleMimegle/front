import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { history } from '../redux/ConfigureStore'
import axios from 'axios'
import { dictApi } from '../shared/api'
import { actionCreators as dictActions } from '../redux/modules/dict'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.min.css'
// import 'swiper/css/free-mode'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

import '../styles/css/TodayDictCardSwiper.css'

import SwiperCore, { Pagination, Navigation, Scrollbar } from 'swiper'

const TodayDictCardSwiper = (props) => {
  SwiperCore.use([Pagination, Navigation, Scrollbar])

  const dispatch = useDispatch()

  const [todayDict, setTodayDict] = useState([])

  const [color, setColor] = useState('')
  const colors = ['yellow', 'coral', 'blue']

  React.useEffect(() => {
    getTodayDictList()
  }, [])

  const getTodayDictList = async () => {
    let response = await dictApi.getTodayDict()
    setTodayDict(response.data.data)
  }

  return (
    <>
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        keyboard={{
          enabled: true,
        }}
        // centeredSlides={true}
        slidesPerGroupSkip={1}
        grabCursor={true}
        // breakpoints={{
        //   769: {
        //     slidesPerView: 2,
        //     slidesPerGroup: 2,
        //   },
        // }}
        scrollbar={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        freeMode={true}
        lazy={true}
        loop={false}
        className="mySwiper"
      >
        {todayDict.map((todayDict, index) => (
          <SwiperSlide className="dict-swiper-slide">
            <div className="TodayDictCard" onClick={() => history.push(`/dict/detail/${todayDict.dictId}`)}>
              <div className="TodayDictCard_1" key={todayDict.id}>
                <div className="TodayDictCard_Title">{todayDict.title}</div>
                <div className="TodayDictCard_Summary">{todayDict.summary}</div>
              </div>
              <TodayDictCardBack index={index} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

const TodayDictCardBack = styled.div`
  border: 2px solid black;
  /* border: none; */
  top: 6px;
  left: 6px;
  background-color: ${(props) => (props.index % 3 === 0 ? '#FFE330' : props.index % 3 === 1 ? '#FF8E00' : '#00A0FF')};
  width: 150px;
  height: 150px;
  position: absolute;

  z-index: 1;
`

export default TodayDictCardSwiper
