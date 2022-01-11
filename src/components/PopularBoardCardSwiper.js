import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { history } from '../redux/ConfigureStore'
import { mainApi } from '../shared/api'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
// import 'swiper/css/free-mode'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

import '../styles/css/PopularBoardCardSwiper.css'

import SwiperCore, { Pagination, Navigation, Scrollbar } from 'swiper'

const PopularBoardCardSwiper = (props) => {
  SwiperCore.use([Pagination, Navigation, Scrollbar])

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
        loop={false}
        className="mySwiper"
      >
        {popularImages.map((popularImages) => (
          <SwiperSlide>
            <div className="PopularBoardCard">
              <div className="PopularBoardCard_1" key={popularImages.id} onClick={() => history.push(`/image/detail/${popularImages.boardId}`)}>
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
