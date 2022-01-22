import styled from 'styled-components'
import React from 'react'

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

const Background = () => {
  return (
    <>
      <Wrap>
        <img className="bubble JjajjaYellow" src={Jjajja} alt="" />
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
        </div>
        {/* 애니메이션 줄것만 따로 사용 */}
        {/* <img className="jjajja" src={Jjajja} alt="" />
            <img className="holymoly" src={Holymoly} alt="" />
            <img className="cute" src={Cute} alt="" />
            <img className="loveu" src={Loveu} alt="" />
            <img className="kingreceive" src={KingReceive} alt="" />
            <img className="letsgo" src={Letsgo} alt="" />
            <img className="nicetomeetu" src={NiceToMeetU} alt="" />
            <img className="title" src={Mimgle} alt="" />
            <img className="bottomicons" src={Smile} alt="" /> */}
      </Wrap>
    </>
  )
}

export default Background

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;

  z-index: -999;

  .bottomSection {
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100%;
  }
  .bottomicons {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
  }
  .bottomicons-2 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 1775px;
    height: 100%;
  }
  /* @media screen and (min-width: 500px) { */
  .title {
    position: absolute;
    top: -470px;
    left: -30px;
    width: 180rem;
    height: 150rem;
  }
  .gguggu {
    position: absolute;
    top: 680px;
    left: 10px;
    width: 18rem;
    height: 8rem;
  }
  .whatevertv {
    position: absolute;
    top: 800px;
    right: -20px;
  }
  .himsoonjjin {
    position: absolute;
    top: 235px;
    left: 500px;
  }
  .JjajjaYellow {
    position: absolute;
    top: -10px;
    left: 0px;
  }
  .MolluYellow {
    position: absolute;
    top: 0;
    right: -45px;
  }
  .HolymolyYellow {
    position: absolute;
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
    .title {
      display: none;
    }
    .gguggu {
      display: none;
    }
    .kingreceive {
      display: none;
    }
    .JjajjaYellow {
      display: none;
    }
    .cute {
      display: none;
    }
    .HolymolyYellow {
      display: none;
    }
    .letsgo {
      display: none;
    }
    .himsoonjjin {
      display: none;
    }
    .nicetomeetu {
      display: none;
    }
    .MolluYellow {
      display: none;
    }
    .loveu {
      display: none;
    }
    .whatevertv {
      display: none;
    }
    .bottomicons {
      display: none;
    }
    .bottomicons-2 {
      display: none;
    }
  }

  @media screen and (min-width: 900px) {
    .title {
      position: absolute;
      top: -350px;
      left: -30px;
      width: 110rem;
      height: 130rem;
    }
    .gguggu {
      position: absolute;
      top: 700px;
      left: 10px;
      width: 13rem;
      height: 6rem;
    }
    .kingreceive {
      top: 750px;
      left: 140px;
      width: 16.5rem;
      height: 6.5rem;

      z-index: 2;
    }
    .JjajjaYellow {
      top: 100px;
      left: -140px;
      width: 100rem;
      height: 65rem;
    }
    .cute {
      top: 600px;
      left: 450px;
      width: 14rem;
      height: 7rem;
    }
    .HolymolyYellow {
      top: 50px;
      left: -100px;
      width: 90rem;
      height: 60rem;
    }
    .letsgo {
      top: 180px;
      left: 300px;
      width: 16rem;
      height: 6.5rem;

      z-index: -1;
    }
    .himsoonjjin {
      top: 230px;
      left: 200px;
      width: 13rem;
      height: 6rem;
    }
    .nicetomeetu {
      top: 270px;
      right: 15px;
      width: 15rem;
      height: 6rem;
    }
    .MolluYellow {
      top: 70px;
      right: -50px;
      width: 92rem;
      height: 55rem;
    }
    .loveu {
      top: 755px;
      right: 130px;
      width: 14rem;
      height: 5.5rem;

      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: 0px;
      width: 15rem;
      height: 6rem;
    }
  }

  @media screen and (min-width: 1120px) {
    .title {
      position: absolute;
      top: -350px;
      left: -15px;
      width: 130rem;
      height: 130rem;
    }
    .gguggu {
      position: absolute;
      top: 700px;
      left: 10px;
      width: 14.5rem;
      height: 6.5rem;
    }
    .kingreceive {
      top: 760px;
      left: 150px;
      width: 18.5rem;
      height: 7.5rem;

      z-index: 2;
    }
    .JjajjaYellow {
      top: 100px;
      left: -140px;
      width: 100rem;
      height: 65rem;
    }
    .cute {
      top: 600px;
      left: 450px;
      width: 14rem;
      height: 7rem;
    }
    .HolymolyYellow {
      top: 30px;
      left: -100px;
      width: 100rem;
      height: 65rem;
    }
    .letsgo {
      top: 170px;
      left: 350px;
      width: 18rem;
      height: 7rem;

      z-index: -1;
    }
    .himsoonjjin {
      top: 230px;
      left: 230px;
      width: 15rem;
      height: 6rem;
    }
    .nicetomeetu {
      top: 270px;
      right: 60px;
      width: 15rem;
      height: 6rem;
    }
    .MolluYellow {
      top: 70px;
      right: -10px;
      width: 92rem;
      height: 55rem;
    }
    .loveu {
      top: 735px;
      right: 150px;
      width: 16rem;
      height: 6rem;

      z-index: 2;
    }
    .whatevertv {
      top: 780px;
      right: 0px;
      width: 17rem;
      height: 6rem;
    }
  }

  @media screen and (min-width: 1400px) {
    .title {
      position: absolute;
      top: -400px;
      left: -30px;
      width: 165rem;
      height: 140rem;
    }
    .gguggu {
      position: absolute;
      top: 700px;
      left: 10px;
      width: 15.5rem;
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
      top: 70px;
      left: -100px;
      width: 120rem;
      height: 70rem;
    }
    .cute {
      top: 600px;
      left: 600px;
      width: 16rem;
      height: 8rem;
    }
    .HolymolyYellow {
      top: 0px;
      left: -150px;
      width: 125rem;
      height: 75rem;
    }
    .letsgo {
      top: 165px;
      left: 420px;
      width: 20rem;
      height: 8rem;

      z-index: -1;
    }
    .himsoonjjin {
      top: 230px;
      left: 300px;
      width: 17rem;
      height: 7rem;
    }
    .nicetomeetu {
      top: 270px;
      right: 110px;
      width: 17rem;
      height: 7rem;
    }
    .MolluYellow {
      top: 30px;
      right: 20px;
      width: 110rem;
      height: 64rem;
    }
    .loveu {
      top: 735px;
      right: 200px;
      width: 18rem;
      height: 7rem;

      z-index: 2;
    }
    .whatevertv {
      top: 780px;
      right: 0px;
      width: 20rem;
      height: 7rem;
    }
  }

  @media screen and (min-width: 1700px) {
    .title {
      position: absolute;
      top: -470px;
      left: -30px;
      width: 180rem;
      height: 150rem;
    }
    .gguggu {
      position: absolute;
      top: 680px;
      left: 10px;
      width: 16.5rem;
      height: 7rem;
    }
    .kingreceive {
      top: 740px;
      left: 150px;
      width: 21rem;
      height: 8rem;

      z-index: 2;
    }
    .JjajjaYellow {
      top: -10px;
      left: 0px;
      width: 135rem;
      height: 75rem;
    }
    .cute {
      top: 600px;
      left: 830px;
      width: 18rem;
      height: 8.5rem;
    }
    .HolymolyYellow {
      top: -20px;
      left: -50px;
      width: 140rem;
      height: 80rem;
    }
    .letsgo {
      top: 155px;
      left: 580px;
      width: 24rem;
      height: 9rem;

      z-index: -1;
    }
    .himsoonjjin {
      top: 235px;
      left: 450px;
      width: 20rem;
      height: 8rem;
    }
    .nicetomeetu {
      top: 290px;
      right: 80px;
      width: 20rem;
      height: 8rem;
    }
    .MolluYellow {
      top: 10px;
      right: -25px;
      width: 130rem;
      height: 73rem;
    }
    .loveu {
      top: 735px;
      right: 195px;

      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: -20px;
    }
    .loveu {
      top: 735px;
      right: 195px;
      width: 19rem;
      height: 8rem;

      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: -10px;
      width: 22rem;
      height: 8rem;
    }
  }

  @media screen and (min-width: 2000px) {
    .title {
      position: absolute;
      top: -470px;
      left: -30px;
      width: 180rem;
      height: 150rem;
    }
    .gguggu {
      position: absolute;
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
      top: -10px;
      left: 150px;
      width: 135rem;
      height: 75rem;
    }
    .cute {
      top: 600px;
      left: 1000px;
      width: 18rem;
      height: 8.5rem;
    }
    .HolymolyYellow {
      top: -20px;
      left: -10px;
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
      top: 235px;
      left: 500px;
      width: 22rem;
      height: 9rem;
    }
    .nicetomeetu {
      top: 300px;
      right: 60px;
      width: 22rem;
      height: 9rem;
    }
    .MolluYellow {
      top: 10px;
      right: -45px;
      width: 140rem;
      height: 77rem;
    }
    .loveu {
      top: 735px;
      right: 195px;
      width: 22rem;
      height: 8.5rem;

      z-index: 2;
    }
    .whatevertv {
      top: 800px;
      right: -25px;
      width: 25rem;
      height: 9rem;
    }
  }
`
