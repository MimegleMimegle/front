import styled from 'styled-components'
import React from 'react'

import Mollu from '../styles/image/background/노랑_몰루.png'
import Jjajja from '../styles/image/background/노랑_짜짜.png'
import Holymoly from '../styles/image/background/노랑_홀리몰리과카몰리.png'
import Mimgle from '../styles/image/background/밈글밈글.svg'
import Cute from '../styles/image/background/주황_700.svg'
import Loveu from '../styles/image/background/주황_h워월v.svg'
import KingReceive from '../styles/image/background/주황_kg받네.svg'
import Letsgo from '../styles/image/background/주황_가보자고.svg'
import NiceToMeetU from '../styles/image/background/주황_만반잘부.svg'
import Gguggu from '../styles/image/background/파랑_꾸꾸.svg'
import WhateverTv from '../styles/image/background/파랑_어쩔티비.svg'
import HimsoonJin from '../styles/image/background/파랑_힘숨찐.svg'
import Smile from '../styles/image/background/하단_스마일.svg'

const Background = () => {
  return (
    <>
      <Wrap>
        <img className="JjajjaYellow" src={Jjajja} alt="" />
        <img className="MolluYellow" src={Mollu} alt="" />
        <img className="HolymolyYellow" src={Holymoly} alt="" />
        <img className="speechbubble" src={Cute} alt="" />
        <img className="speechbubble" src={Loveu} alt="" />
        <img className="speechbubble" src={KingReceive} alt="" />
        <img className="speechbubble" src={Letsgo} alt="" />
        <img className="speechbubble" src={NiceToMeetU} alt="" />
        <img className="speechbubble" src={Gguggu} alt="" />
        <img className="speechbubble" src={WhateverTv} alt="" />
        <img className="speechbubble" src={HimsoonJin} alt="" />
        <img className="title" src={Mimgle} alt="" />
        <img className="bottomicons" src={Smile} alt="" />

        {/* 애니메이션 줄것만 따로 사용 */}
        {/* <img className="jjajja" src={Jjajja} alt="" />
            <img className="holymoly" src={Holymoly} alt="" />
            <img className="cute" src={Cute} alt="" />
            <img className="loveu" src={Loveu} alt="" />
            <img className="kingreceive" src={KingReceive} alt="" />
            <img className="letsgo" src={Letsgo} alt="" />
            <img className="nicetomeetu" src={NiceToMeetU} alt="" />
            <img className="gguggu" src={Gguggu} alt="" />
            <img className="whatevertv" src={WhateverTv} alt="" />
            <img className="himsoonjjin" src={HimsoonJin} alt="" />
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

  /* @media screen and (min-width: 500px) { */
  .speechbubble {
    position: absolute;
    left: 10;
    right: 0;
    bottom: 0;
    top: 10;
    width: 120rem;
    height: 70rem;
  }
  .title {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 130rem;
    height: 70rem;
  }
  .JjajjaYellow {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .MolluYellow {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .HolymolyYellow {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media screen and (min-width: 500px) {
    .bottomicons {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
    }
  }

  /* } */
`
