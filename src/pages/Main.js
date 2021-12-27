import React from 'react'
import '../styles/css/Main.css'
import MainPageImageSlide from '../components/MainPageImageSlide'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Lazy, Autoplay, Keyboard, Pagination, Navigation } from 'swiper'

const Main = (props) => {
  SwiperCore.use([Lazy, Autoplay, Keyboard, Pagination, Navigation])

  return (
    <>
      <div className="MainPageLayout">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          lazy={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
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
            <div className="MainPageTag">700</div>
            <div className="MainPageTag">다꾸</div>
            <div className="MainPageTag">뽀시래기</div>
            <div className="MainPageTag">광공</div>
            <div className="MainPageTag">알잘딱깔센</div>
            <div className="MainPageTag">ㅈㅂㅈㅇ</div>
            <div className="MainPageTag">비상이다</div>
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
