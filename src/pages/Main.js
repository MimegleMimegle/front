import React from 'react'
import '../styles/css/Main.css'
import MainPageImageSlide from '../components/MainPageImageSlide'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import '../styles/css/Main.css'
import SwiperCore, { Pagination, Navigation } from 'swiper'

const Main = (props) => {
  SwiperCore.use([Pagination, Navigation])

  return (
    <>
      <div className="MainPageLayout">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
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
          <div className="MainPageTag">700</div>
          <div className="MainPageTag">다꾸</div>
          <div className="MainPageTag">뽀시래기</div>
          <div className="MainPageTag">광공</div>
          <div className="MainPageTag">알잘딱깔센</div>
          <div className="MainPageTag">ㅈㅂㅈㅇ</div>
          <div className="MainPageTag">비상이다</div>
        </div>
      </div>
    </>
  )
}

export default Main
