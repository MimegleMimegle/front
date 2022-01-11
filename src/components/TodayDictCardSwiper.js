import React, { useEffect, useState } from 'react'
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
  const backColor = ['#ffe330', '#ff8e00', '#00a0ff']

  React.useEffect(() => {
    getTodayDictList()
  }, [])

  const getTodayDictList = async () => {
    let response = await dictApi.getTodayDict()
    setTodayDict(response.data.data)
    console.log(response)
  }

  console.log(todayDict)
  console.log(backColor)

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        keyboard={{
          enabled: true,
        }}
        centeredSlides={true}
        slidesPerGroupSkip={0}
        grabCursor={true}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        freeMode={true}
        loop={false}
        className="mySwiper"
      >
        {todayDict.map((todayDict) => (
          <SwiperSlide>
            <div className="TodayDictCard" onClick={() => history.push(`/dict/detail/${todayDict.dictId}`)}>
              <div className="TodayDictCard_1" key={todayDict.id}>
                <div className="TodayDictCard_Title">{todayDict.title}</div>
                <div className="TodayDictCard_Summary">{todayDict.summary}</div>
              </div>
              {backColor.map((s) => (
                <div className="TodayDictCard_2" style={{ backgroundColor: backColor }}></div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default TodayDictCardSwiper
