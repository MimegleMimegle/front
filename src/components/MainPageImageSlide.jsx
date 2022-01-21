import React from 'react'
import '../styles/css/MainPageImageSlide.css'
import MainCarousel_1 from '../styles/image/main_carousel_2.gif'
import MainCarousel_2 from '../styles/image/main_carousel_3.jpeg'

const MainPageImageSlide = ({ type }) => {
  return (
    <>
      <div className="MainPageSlideLayout">
        <div className="SlideImage">
          <img src={type === 'quiz' ? MainCarousel_1 : MainCarousel_2} />
        </div>
      </div>
    </>
  )
}

export default MainPageImageSlide
