import styled from 'styled-components'
import React from 'react'

// import Mollu from '../styles/image/배경 분리/노랑 몰?루.svg'
import Jjajja from '../styles/image/배경 분리/노랑 짜짜.svg'
import Holymoly from '../styles/image/배경 분리/노랑 홀리몰리과카몰리.svg'
import Mimgle from '../styles/image/배경 분리/밈글밈글.svg'
import  Cute from '../styles/image/배경 분리/주황 700.svg'
import Loveu from '../styles/image/배경 분리/주황 h워월v.svg'
import KingReceive from '../styles/image/배경 분리/주황 kg받네.svg'
import Letsgo from '../styles/image/배경 분리/주황 가보자고.svg'
import NiceToMeetU from '../styles/image/배경 분리/주황 만반잘부.svg'
import Gguggu from '../styles/image/배경 분리/파랑 꾸꾸.svg'
import WhateverTv from '../styles/image/배경 분리/파랑 어쩔티비.svg'
import HimsoonJin from '../styles/image/배경 분리/파랑 힘숨찐.svg'
import Smile from '../styles/image/배경 분리/하단 스마일.svg'

const Background = () => {
    return (
        <>
        <Wrap>
            <img className="speechbubble" src={Jjajja} alt="" />
            <img className="speechbubble" src={Holymoly} alt="" />
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

export default Background;

const Wrap = styled.div`
    overflow: fixed;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    /* @media screen and (min-width: 500px) { */
        .speechbubble{
            position:absolute;
            top: 0;
            right:0;
            bottom: 0;
            left: 0;
            height: 100vh;

        }
        .title{
            position:absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100vh;
        }

        @media screen and (min-width: 500px) {
            .bottomicons {
                position:absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                height: 100vh;
                

            }
        }
    /* } */
  }
`
