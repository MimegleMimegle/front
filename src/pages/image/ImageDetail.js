import React from 'react'
import styled from 'styled-components'

import { history } from '../../redux/ConfigureStore'

import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const ImageDetail = (props) => {
  const tempImgUrl = 'https://t1.daumcdn.net/cfile/tistory/99F374385C14B20635'

  return (
    <>
      <Wrapper>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', padding: '0 15px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              className="icon-button"
              onClick={() => {
                history.goBack()
              }}
            >
              <IoCloseOutline style={{ fontSize: '24px' }} />
            </button>
            <button className="icon-button">
              <MdShare style={{ fontSize: '20px' }} />
            </button>
          </div>
          <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center' }}>
            <img src={tempImgUrl} style={{ width: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '100%', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
            <button className="icon-button">
              <HiOutlineHeart style={{ fontSize: '22px' }} />
            </button>
            <span style={{ color: '#FFF', fontSize: '14px' }}>55</span>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #111;
  z-index: 3000;
  .icon-button {
    color: #fff;
  }
`
export default ImageDetail
