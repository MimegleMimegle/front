import React from 'react'
import '../styles/css/MainPageImageSlide.css'
import MainCarousel_2 from '../styles/image/main_carousel_image2.gif'

const MainPageImageSlide = (props) => {
  return (
    <>
      <div className="MainPageSlideLayout">
        <div className="SlideImage">
          <img src={MainCarousel_2} />
        </div>
      </div>
    </>
  )
}

export default MainPageImageSlide
