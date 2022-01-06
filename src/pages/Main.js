import React, { useState, useEffect } from 'react'
import { mainApi } from '../shared/api'

import MainPageImageSlide from '../components/MainPageImageSlide'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Lazy, Autoplay, Keyboard, Pagination } from 'swiper'

import Header from '../components/Header'

import 'swiper/css'
import 'swiper/css/lazy'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../styles/css/Main.css'

const Main = (props) => {
  SwiperCore.use([Lazy, Autoplay, Keyboard, Pagination])

  const [popularBoards, setPopularBoards] = useState([])
  const [popularImages, setPopularImages] = useState([])
  const [todayMemes, setTodayMemes] = useState([])

  const searchDictDB = async () => {
    let response = await mainApi.mainPage()

    console.log(response)
    setPopularBoards(response.data.data.popularBoards)
    setPopularImages(response.data.data.popularImages)
    setTodayMemes(response.data.data.todayMemes)

    console.log(popularBoards)
    console.log(popularImages)
    console.log(todayMemes)
    console.log(todayMemes[1].dictName)
  }

  React.useEffect(() => {
    searchDictDB()
  }, [])

  return (
    <>
      <Header />
      <div className="MainPageLayout">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          lazy={true}
          centeredSlides={true}
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          keyboard={{
            enabled: true,
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <MainPageImageSlide />
          </SwiperSlide>
          <SwiperSlide>
            <MainPageImageSlide />
          </SwiperSlide>
          <SwiperSlide>
            <MainPageImageSlide />
          </SwiperSlide>
          <SwiperSlide>
            <MainPageImageSlide />
          </SwiperSlide>
          <SwiperSlide>
            <MainPageImageSlide />
          </SwiperSlide>
        </Swiper>
        <div className="MainPageTagSection">
          <text className="MainPageTagName">오늘의 단어</text>
          <div className="MainPageTagList">
            {todayMemes.map((dictId) => (
              <div className="MainPageTag">{todayMemes[0].dictName}</div>
            ))}
          </div>
          <text className="MainPageTagMoreButton1">More</text>
        </div>
        <text className="MainPageTopPostText">명예의 밈글</text>
        <div className="MainPageTopPostSection">
          <div className="MainPageTopPostList">
            <div className="MainPageTopPost">
              <text className="MainPageTopPostContent">밈 이미지</text>
            </div>
          </div>
          <div className="MainPageTopPostList">
            <div className="MainPageTopPost">
              <text className="MainPageTopPostContent">밈 이미지</text>
            </div>
          </div>
          <div className="MainPageTopPostList">
            <div className="MainPageTopPost">
              <text className="MainPageTopPostContent">밈 이미지</text>
            </div>
          </div>
        </div>
        <text className="MainPageTagMoreButton2">More</text>
      </div>
    </>
  )
}

export default Main
