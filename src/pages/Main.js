import React, { useState, useEffect } from 'react'
import { mainApi } from '../shared/api'
import { history } from '../redux/ConfigureStore'

import MainPageImageSlide from '../components/MainPageImageSlide'
import PopularBoardCardSwiper from '../components/PopularBoardCardSwiper'
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
  }

  React.useEffect(() => {
    searchDictDB()
  }, [])

  let characterArray = new Array()
  characterArray[0] = '../styles/image/smileIcon_Orange.png'
  characterArray[1] = '../styles/image/smileIcon_Yellow.png'
  characterArray[2] = '../styles/image/smileIcon_Blue.png'

  function showCharacter() {
    let characterNumber = Math.round(Math.random() * 2)

    console.log(characterNumber)
    let objImg = document.getElementById('defaultThumbnail')
    objImg.src = characterArray[characterNumber]
  }

  return (
    <>
      <Header />
      <div className="MainPageLayout">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
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
          <div className="MainPageTagName">오늘의 밈</div>
          <div className="MainPageTagList">
            {todayMemes.map((todayMemes) => (
              <div className="MainPageTag" key={todayMemes.id} onClick={() => history.push(`/dict/detail/${todayMemes.dictId}`)}>
                {todayMemes.dictName}
              </div>
            ))}
          </div>
          <div className="MainPageTagMoreButton_1">
            <div className="MainPageTagMoreButton_1st" onClick={() => history.push('/dict')}>
              <div className="MainPageTagMoreButton1">More</div>
              <svg width="96" height="30" viewBox="0 0 96 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 29H93L65.1497 1" stroke="black" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>
        <div className="MainPageTopPostText">명예의 밈글</div>
        <PopularBoardCardSwiper />
        <div className="MainPageTagMoreButton_2">
          <div className="MainPageTagMoreButton_2nd" onClick={() => history.push('/image')}>
            <div className="MainPageTagMoreButton2">More</div>
            <svg width="96" height="30" viewBox="0 0 96 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 29H93L65.1497 1" stroke="black" stroke-width="2" />
            </svg>
          </div>
        </div>
        <div className="MainPagePopularBoardSection">
          <div className="MainPagePopularBoardText">핫 밈글</div>
          {popularBoards.map((popularBoards) => (
            <div className="MainPagePopularBoardList" key={popularBoards.id} onClick={() => history.push(`/post/detail/${popularBoards.boardId}`)}>
              <div onload="showCharacter()">
                <img className="MainPagePopularBoardImage" src={popularBoards.thumbNail ? popularBoards.thumbNail : ''}></img>
              </div>
              <div className="MainPagePopularBoardInfo">
                <div className="MainPagePopularBoardTitle">{popularBoards.title}</div>
                <div className="MainPagePopularBoardWriter">{popularBoards.writer}</div>
              </div>
            </div>
          ))}
          <div className="MainPageTagMoreButton_3">
            <div className="MainPageTagMoreButton_3rd" onClick={() => history.push('/post')}>
              <div className="MainPageTagMoreButton3">More</div>
              <svg width="96" height="30" viewBox="0 0 96 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 29H93L65.1497 1" stroke="black" stroke-width="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
