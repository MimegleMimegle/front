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


// import React, { useRef, useState } from "react";
// import styled from "styled-components";
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper.min.css'
// import 'swiper/components/navigation/navigation.min.css'
// import SwiperCore, { Autoplay, Navigation, Pagination, } from 'swiper'
// import { GrFormPrevious, GrFormNext, } from "react-icons/gr";

 

// const PostlistSlider = (props) => {
//     const [swiper, setSwiper] = React.useState(null);
//     const [PostCtgrIndex,setPostCtgrIndex] = React.useState(0);

//     SwiperCore.use([Navigation]);

//     const navigationPrevRef = useRef(null);
//     const navigationNextRef = useRef(null);

//     const swiperParams = {
//         navigation: {prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current},
//         onBeforeInit: (swiper)=> {
//             swiper.params.navigation.prevEl = navigationPrevRef.current;
//             swiper.params.navigation.nextEl= navigationNextRef.current;
//             swiper.activeIndex = PostCtgrIndex;
//             swiper.navigation.update();
//         },
//         // slidersPerview: "3",
//         onSwiper: setSwiper,
//         onSlideChange: (e) => setPostCtgrIndex(e.activeIndex),
//     };    


//     return (
//         <>
//         <Wrap>
//             <GrFormPrevious ref={navigationPrevRef}/>   
//             <StyledSwiper className="prevbtn" size="20px" {...swiperParams} ref={setSwiper}>
//                 <GrFormPrevious ref={navigationPrevRef}/>               
//                 <SwiperSlide>고민상담</SwiperSlide> 
//                 <SwiperSlide>잡담방</SwiperSlide> 
//                 <SwiperSlide>10대방</SwiperSlide>
//                 <SwiperSlide>20대방</SwiperSlide> 
//                 <SwiperSlide>30대방</SwiperSlide> 
//                 <SwiperSlide>40대방</SwiperSlide> 
//                 <SwiperSlide>50대방</SwiperSlide> 
//                 <GrFormNext className="nextbtn" size="10"ref={navigationNextRef}/>
//             </StyledSwiper>
//         </Wrap>
//         </>
//     ); 
// }; 

// export default PostlistSlider;

// const Wrap = styled.div`
//     display: flex;
//     flex-direction: row;
// `;

// const StyledSwiper = styled(Swiper)`
//     display: flex;
//     width: 40px;
//     height: 30px;

//     .nextbtn{

//     }
//     .prevbtn{

//     }

// `;