import styled from 'styled-components'
import React from 'react/index'
import MemegleVertical from '../styles/image/background/Memegle_vertical.svg'
import MemegleHeight from '../styles/image/background/Memegle_height.svg'
import MemegleHello from '../styles/image/background/Memegle_hello.svg'
import MemegleMemegle from '../styles/image/background/Memegle_memegle.svg'
import Mollu from '../styles/image/background/노랑_몰루.png'
import Jjajja from '../styles/image/background/노랑_짜짜.png'
import Holymoly from '../styles/image/background/노랑_홀리몰리과카몰리.png'
import Mimgle from '../styles/image/background/밈글밈글.svg'
import Cute from '../styles/image/background/주황_700.png'
import Loveu from '../styles/image/background/주황_h워월v.png'
import KingReceive from '../styles/image/background/주황_kg받네.png'
import Letsgo from '../styles/image/background/주황_가보자고.png'
import NiceToMeetU from '../styles/image/background/주황_만반잘부.png'
import Gguggu from '../styles/image/background/blue_Gguggu.png'
import WhateverTv from '../styles/image/background/blue_WhateverTV.png'
import HimsoonJin from '../styles/image/background/blue_Himsumjjin.png'
import Smile from '../styles/image/background/하단_스마일.png'
import MemegleBackground from '../styles/image/background/background.jpeg'

const Background = React.memo(() => {
  return (
    <>
      <Wrap>
        {/* <img className="bubble JjajjaYellow" src={Jjajja} alt="" />
        <img className="bubble MolluYellow" src={Mollu} alt="" />
        <img className="bubble HolymolyYellow" src={Holymoly} alt="" />
        <img className="bubble cute" src={Cute} alt="" />
        <img className="bubble loveu" src={Loveu} alt="" />
        <img className="bubble kingreceive" src={KingReceive} alt="" />
        <img className="bubble letsgo" src={Letsgo} alt="" />
        <img className="bubble nicetomeetu" src={NiceToMeetU} alt="" />
        <img className="bubble gguggu" src={Gguggu} alt="" />
        <img className="bubble whatevertv" src={WhateverTv} alt="" />
        <img className="bubble himsoonjjin" src={HimsoonJin} alt="" />
        <img className="title" src={Mimgle} alt="" />
        <div className="bottomSection">
          <img className="bottomicons" src={Smile} alt="" />
          <img className="bottomicons-2" src={Smile} alt="" />
        </div> */}
        <img className="background" src={MemegleBackground} alt="배경화면" />
      </Wrap>
    </>
  )
})

export default Background

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: -999;
  .background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .bottomSection {
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100%;
  }
  .bottomicons {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
  }
  .bottomicons-2 {
    position: absolute;
    bottom: 0;
    left: 1775px;
    z-index: 5;
  }
  .title {
    position: absolute;
    top: -470px;
    left: -30px;
    width: 180rem;
    height: 150rem;
  }
  .gguggu {
    top: 680px;
    left: 10px;
    width: 18rem;
    height: 8rem;
  }
  .whatevertv {
    top: 800px;
    right: -20px;
  }
  .himsoonjjin {
    top: 235px;
    left: 500px;
  }
  .JjajjaYellow {
    top: -10px;
    left: 0px;
  }
  .MolluYellow {
    top: 0;
    right: -45px;
  }
  .HolymolyYellow {
    top: -20px;
    left: 0px;
  }
  .bubble {
    position: absolute;
  }
  .cute {
    top: 600px;
    left: 830px;
  }
  .loveu {
    top: 735px;
    right: 195px;
    z-index: 2;
  }
  .kingreceive {
    top: 760px;
    left: 150px;
    z-index: 2;
  }
  .letsgo {
    top: 150px;
    left: 620px;
    z-index: -1;
  }
  .nicetomeetu {
    top: 300px;
    right: 60px;
  }
  @media screen and (max-width: 900px) {
    .title,
    .bubble,
    .bottomSection {
      display: none;
    }
  }
  @media screen and (min-width: 900px) {
    .title {
      top: -150px;
      left: 0px;
      width: 100rem;
      height: 80rem;
    }
    .gguggu {
      top: 770px;
      left: 0px;
      width: 9rem;
      height: 4rem;
    }
    .kingreceive {
      top: 800px;
      left: 100px;
      width: 12rem;
      height: 4.5rem;
      z-index: 2;
    }
    .JjajjaYellow {
      top: 300px;
      left: -90px;
      width: 60rem;
      height: 35rem;
    }
    .cute {
      top: 600px;
      left: 320px;
      width: 9rem;
      height: 4rem;
    }
    .HolymolyYellow {
      top: 70px;
      left: -65px;
      width: 65rem;
      height: 40rem;
    }
    .letsgo {
      top: 165px;
      left: 290px;
      width: 12rem;
      height: 4.5rem;
      z-index: -1;
    }
    .himsoonjjin {
      top: 210px;
      left: 200px;
      width: 10rem;
      height: 4rem;
    }
    .nicetomeetu {
      top: 330px;
      right: 20px;
      width: 9rem;
      height: 4rem;
    }
    .MolluYellow {
      top: 190px;
      right: -35px;
      width: 60rem;
      height: 35rem;
    }
    .loveu {
      top: 755px;
      right: 50px;
      width: 10rem;
      height: 3.5rem;
      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: 5px;
      width: 10rem;
      height: 3.5rem;
    }
  }
  @media screen and (min-width: 1120px) {
    .title {
      top: -200px;
      left: 0px;
      width: 120rem;
      height: 90rem;
    }
    .gguggu {
      top: 735px;
      left: 10px;
      width: 11rem;
      height: 5rem;
    }
    .kingreceive {
      top: 780px;
      left: 120px;
      width: 15rem;
      height: 5.5rem;
      z-index: 2;
    }
    .JjajjaYellow {
      top: 200px;
      left: -50px;
      width: 80rem;
      height: 45rem;
    }
    .cute {
      top: 600px;
      left: 500px;
      width: 11rem;
      height: 5rem;
    }
    .HolymolyYellow {
      top: 25px;
      left: -65px;
      width: 80rem;
      height: 50rem;
    }
    .letsgo {
      top: 150px;
      left: 350px;
      width: 16rem;
      height: 6rem;
      z-index: -1;
    }
    .himsoonjjin {
      top: 210px;
      left: 250px;
      width: 13rem;
      height: 5rem;
    }
    .nicetomeetu {
      top: 330px;
      right: 30px;
      width: 12.5rem;
      height: 5rem;
    }
    .MolluYellow {
      top: 150px;
      right: -40px;
      width: 80rem;
      height: 45rem;
    }
    .loveu {
      top: 750px;
      right: 90px;
      width: 12rem;
      height: 4.5rem;
      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: 5px;
      width: 12rem;
      height: 4.5rem;
    }
  }
  @media screen and (min-width: 1400px) {
    .title {
      top: -350px;
      left: -30px;
      width: 140rem;
      height: 110rem;
    }
    .gguggu {
      top: 700px;
      left: 10px;
      width: 14rem;
      height: 6rem;
    }
    .kingreceive {
      top: 760px;
      left: 150px;
      width: 18rem;
      height: 6.5rem;
      z-index: 2;
    }
    .JjajjaYellow {
      top: 150px;
      left: 10px;
      width: 90rem;
      height: 50rem;
    }
    .cute {
      top: 600px;
      left: 650px;
      width: 14rem;
      height: 6rem;
    }
    .HolymolyYellow {
      top: 30px;
      left: 0px;
      width: 100rem;
      height: 60rem;
    }
    .letsgo {
      top: 170px;
      left: 530px;
      width: 22rem;
      height: 7.5rem;
      z-index: -1;
    }
    .himsoonjjin {
      top: 240px;
      left: 400px;
      width: 17rem;
      height: 6.5rem;
    }
    .nicetomeetu {
      top: 330px;
      right: 50px;
      width: 16rem;
      height: 6rem;
    }
    .MolluYellow {
      top: 100px;
      right: -30px;
      width: 100rem;
      height: 55rem;
    }
    .loveu {
      top: 740px;
      right: 155px;
      width: 16rem;
      height: 6rem;
      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: 5px;
      width: 16rem;
      height: 6rem;
    }
  }
  @media screen and (min-width: 1700px) {
    .title {
      position: absolute;
      top: -470px;
      left: -30px;
      width: 160rem;
      height: 130rem;
    }
    .gguggu {
      position: absolute;
      top: 680px;
      left: 10px;
      width: 16rem;
      height: 7rem;
    }
    .kingreceive {
      top: 760px;
      left: 150px;
      width: 20rem;
      height: 8rem;
      z-index: 2;
    }
    .JjajjaYellow {
      top: 30px;
      left: 100px;
      width: 110rem;
      height: 60rem;
    }
    .cute {
      top: 550px;
      left: 850px;
      width: 16rem;
      height: 7rem;
    }
    .HolymolyYellow {
      top: -10px;
      left: -20px;
      width: 120rem;
      height: 70rem;
    }
    .letsgo {
      top: 155px;
      left: 630px;
      width: 25rem;
      height: 9rem;
      z-index: -1;
    }
    .himsoonjjin {
      top: 240px;
      left: 470px;
      width: 20rem;
      height: 8rem;
    }
    .nicetomeetu {
      top: 300px;
      right: 55px;
      width: 19rem;
      height: 7.5rem;
    }
    .MolluYellow {
      top: 20px;
      right: -50px;
      width: 120rem;
      height: 65rem;
    }
    .loveu {
      top: 735px;
      right: 195px;
      width: 19rem;
      height: 7rem;
      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: -25px;
      width: 20rem;
      height: 7rem;
    }
  }
  @media screen and (min-width: 2000px) {
    .title {
      top: -550px;
      left: -30px;
      width: 170rem;
      height: 140rem;
    }
    .gguggu {
      top: 680px;
      left: 10px;
      width: 18rem;
      height: 8rem;
    }
    .kingreceive {
      top: 760px;
      left: 150px;
      width: 23rem;
      height: 9rem;
      z-index: 2;
    }
    .JjajjaYellow {
      top: -60px;
      left: 100px;
      width: 24rem;
      height: 9rem;
    }
    .cute {
      top: 550px;
      left: 1000px;
      width: 18rem;
      height: 8rem;
    }
    .HolymolyYellow {
      top: -45px;
      left: -130px;
      width: 140rem;
      height: 80rem;
    }
    .letsgo {
      top: 150px;
      left: 630px;
      width: 26rem;
      height: 10rem;
      z-index: -1;
    }
    .himsoonjjin {
      top: 240px;
      left: 470px;
      width: 22rem;
      height: 9rem;
    }
    .nicetomeetu {
      top: 300px;
      right: 80px;
      width: 22rem;
      height: 9rem;
    }
    .MolluYellow {
      top: -50px;
      right: -50px;
      width: 24rem;
      height: 9rem;
    }
    .loveu {
      top: 735px;
      right: 195px;
      width: 20rem;
      height: 7.5rem;
      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: -25px;
      width: 21rem;
      height: 7.5rem;
    }
  }
`
