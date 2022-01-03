import React from 'react'
import '../styles/css/MainPageImageSlide.css'
import MainCarousel_1 from '../styles/image/main_carousel_image1.gif'

const MainPageImageSlide = (props) => {
  return (
    <>
      <div className="MainPageSlideLayout">
        <div className="SlideImage">
          <img src={MainCarousel_1} />
        </div>
      </div>
    </>
  )
}

export default MainPageImageSlide
