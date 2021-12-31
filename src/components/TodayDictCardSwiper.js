import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { history } from '../redux/ConfigureStore'
import axios from 'axios'
import { actionCreators as dictActions } from '../redux/modules/dict'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '../styles/css/TodayDictCardSwiper.css'

import SwiperCore, { FreeMode, Pagination, Navigation, Scrollbar } from 'swiper'

const TodayDictCardSwiper = (props) => {
  SwiperCore.use([FreeMode, Pagination, Navigation, Scrollbar])

  const dispatch = useDispatch()

  const [todayDict, setTodayDict] = useState([])

  React.useEffect(() => {
    dispatch(dictActions.getTodayDictListDB())
  }, [])

  console.log(todayDict)

  const getTodayDictListDB = async () => {
    let response = await axios.get(`http://52.78.155.185/api/bestDict/dict`)

    console.log(response)
  }

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        keyboard={{
          enabled: true,
        }}
        // centeredSlides={true}
        slidesPerGroupSkip={1}
        grabCursor={true}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        freeMode={true}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="TodayDictCard">
            <div className="TodayDictCard_1">
              <div className="TodayDictCard_Title">알잘딱깔센</div>
              <div className="TodayDictCard_Summary">알아서 잘 딱 깔끔하고 센스있게</div>
            </div>
            <div className="TodayDictCard_2"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="TodayDictCard">
            <div className="TodayDictCard_1">
              <div className="TodayDictCard_Title">알잘딱깔센</div>
              <div className="TodayDictCard_Summary">알아서 잘 딱 깔끔하고 센스있게</div>
            </div>
            <div className="TodayDictCard_2"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="TodayDictCard">
            <div className="TodayDictCard_1">
              <div className="TodayDictCard_Title">알잘딱깔센</div>
              <div className="TodayDictCard_Summary">알아서 잘 딱 깔끔하고 센스있게</div>
            </div>
            <div className="TodayDictCard_2"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="TodayDictCard">
            <div className="TodayDictCard_1">
              <div className="TodayDictCard_Title">알잘딱깔센</div>
              <div className="TodayDictCard_Summary">알아서 잘 딱 깔끔하고 센스있게</div>
            </div>
            <div className="TodayDictCard_2"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="TodayDictCard">
            <div className="TodayDictCard_1">
              <div className="TodayDictCard_Title">알잘딱깔센</div>
              <div className="TodayDictCard_Summary">알아서 잘 딱 깔끔하고 센스있게</div>
            </div>
            <div className="TodayDictCard_2"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default TodayDictCardSwiper
