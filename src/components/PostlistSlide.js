import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { Autoplay, Navigation, Pagination, } from 'swiper'

const PostlistSlider = (props) => {
    
    return (
        <Wrap>
            <Swiper 
                style={{height:'376px'}} 
                spaceBetween={10} 
                slidesPerView={4} 
                loop={false}
                pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')} > 
            <SwiperSlide>고민상담</SwiperSlide> 
            <SwiperSlide>잡담방</SwiperSlide> 
            <SwiperSlide>10대방</SwiperSlide>
            <SwiperSlide>20대방</SwiperSlide> 
            <SwiperSlide>30대방</SwiperSlide> 
            <SwiperSlide>40대방</SwiperSlide> 
            <SwiperSlide>50대방</SwiperSlide> 
            </Swiper>
        </Wrap>  
    ); 
}; 

export default PostlistSlider;

const Wrap = `

`;