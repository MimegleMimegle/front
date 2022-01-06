import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { history } from '../redux/ConfigureStore'
import { mainApi } from '../shared/api'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '../styles/css/PopularBoardCardSwiper.css'

import SwiperCore, { FreeMode, Pagination, Navigation, Scrollbar } from 'swiper'

const PopularBoardCardSwiper = (props) => {
  SwiperCore.use([FreeMode, Pagination, Navigation, Scrollbar])

  const dispatch = useDispatch()

  const [popularImages, setPopularImages] = useState([])

  const searchDictDB = async () => {
    let response = await mainApi.mainPage()

    console.log(response)
    setPopularImages(response.data.data.popularImages)

    console.log(popularImages)
  }

  React.useEffect(() => {
    searchDictDB()
  }, [])

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={50}
        keyboard={{
          enabled: true,
        }}
        // centeredSlides={true}
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
        freeMode={false}
        loop={true}
        className="mySwiper"
      >
        {popularImages.map((popularImages) => (
          <SwiperSlide>
            <div className="PopularBoardCard" onClick={() => history.push(`/image/detail/${popularImages.boardId}`)}>
              <div className="PopularBoardCard_1" key={popularImages.id}>
                <img className="PopularBoardCard_Image" src={popularImages.imageUrl}></img>
              </div>
              <div className="PopularBoardCard_2"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default PopularBoardCardSwiper
