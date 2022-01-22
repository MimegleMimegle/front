import styled from 'styled-components'
import React from 'react'

// import { ReactComponent as Mollu} from '../styles/image/배경 분리/노랑 몰?루.svg'
import { ReactComponent as Jjajja } from '../styles/image/배경 분리/노랑 짜짜.svg'
import { ReactComponent as Holymoly } from '../styles/image/배경 분리/노랑 홀리몰리과카몰리.svg'
import { ReactComponent as Mimgle } from '../styles/image/배경 분리/밈글밈글.svg'
import { ReactComponent as Cute } from '../styles/image/배경 분리/주황 700.svg'
import { ReactComponent as WhateverTv } from '../styles/image/배경 분리/파랑 어쩔티비.svg'
import { ReactComponent as Smile } from '../styles/image/배경 분리/하단 스마일.svg'
import SoCute from '../styles/image/배경 분리/주황 700.svg'
import Smilee from '../styles/image/배경 분리/하단 스마일.svg'

const Background = () => {
  return (
    <>
      <Wrap>
        {/* <Mollu/> */}
        <Jjajja fill="gray" />
        <SocuteImage src={SoCute} />
        <Holymoly />
        <Mimgle />
        <Cute />
        <WhateverTv />
        <Smile />
      </Wrap>
    </>
  )
}

const SocuteImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
`
export default Background

const Wrap = styled.div`
  position: relative;
`
