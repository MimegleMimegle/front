import React, { useRef } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { Navigation } from 'swiper'

import QuizPaper from '../components/QuizPaper'

const Quiz = (props) => {
  const [swiper, setSwiper] = React.useState(null)
  const [quizIndex, setQuizIndex] = React.useState(0)

  SwiperCore.use([Navigation])

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const swiperParams = {
    navigation: { prevEl: prevRef.current, nextEl: nextRef.current },
    onBeforeInit: (swiper) => {
      swiper.params.navigation.prevEl = prevRef.current
      swiper.params.navigation.nextEl = nextRef.current
      // swiper.activeIndex = quizIndex
      swiper.navigation.init()
      swiper.navigation.update()
    },
    onSwiper: setSwiper,
    // onSlideChange: (e) => setQuizIndex(e.activeIndex),
  }

  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', padding: '10px 0' }}>
          <h2 style={{ textAlign: 'center' }}>
            신세대 1교시 <br /> OOO영역
          </h2>
        </div>
        <div style={{ paddingTop: '10px', display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
          <StyleSwiper {...swiperParams} ref={setSwiper}>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <SwiperSlide>
              <QuizPaper />
            </SwiperSlide>
            <button ref={prevRef}>뒤로 가기</button>
            <button ref={nextRef}>다음 문제</button>
          </StyleSwiper>
        </div>
        <div style={{ width: '100%' }}>
          <div>
            <p style={{ textAlign: 'right', fontSize: '12px' }}>n/10</p>
          </div>
          <div>
            <div>progress bar</div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin-left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyleSwiper = styled(Swiper)`
  position: relative;
  width: 345px;
  height: 100%;
`

export default Quiz
