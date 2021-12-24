import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { 
  Navigation, 
  Pagination, 
  Scrollbar, 
  A11y 
} from "swiper";

//style
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import "swiper/components/pagination/pagination.min.css"; 
import "swiper/components/scrollbar/scrollbar.min.css"; 

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const PostListSlide = () =>{
  return (
    <React.Fragment>
        <div style={{height:"70px", display:"flex"}}>
            <Swiper
            className='swiper-container'
            style={{}}
            spaceBetween={10}
            slidesPerView={3}
            navigation 
            pagination={{ clickable: true }} 
            scrollbar={{ draggable: true }} 
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            >
                <SwiperSlide style={{display:"flex", alignItems:"center"}} > 잡담방 </SwiperSlide>
                <SwiperSlide style={{display:"flex", alignItems:"center"}}> 공감방 </SwiperSlide>
                <SwiperSlide style={{display:"flex", alignItems:"center"}}> 고민상담방 </SwiperSlide>
                <SwiperSlide style={{display:"flex", alignItems:"center"}}> 꿀템공유방 </SwiperSlide>
                <SwiperSlide style={{display:"flex", alignItems:"center"}}> 고민상담방 </SwiperSlide>
            </Swiper>
        </div>
    </React.Fragment>  
  );
}

export default PostListSlide;