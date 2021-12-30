import React from 'react'
import styled from 'styled-components'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const OneImageCard = (props) => {
  const tempImgUrl = 'https://image.idus.com/image/files/92e848f447904facb3fb7fcf5b3cdf6a_1080.jpg'

  const [hover, setHover] = React.useState(false)
  const [toggleMenu, setToggleMenu] = React.useState(false)

  const clickToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleClickDetail = () => {}

  return (
    <>
      <ImageBox
        onMouseOver={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
          setToggleMenu(false)
        }}
      >
        <ImageThumbnail src={tempImgUrl}></ImageThumbnail>
        {hover && (
          <Overlay>
            <div style={{ width: '100%', height: '100%', padding: '5px 0 5px 2px', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
              <button style={{ color: '#FFF' }}>
                <HiOutlineHeart fontSize="20px" />
              </button>
              <button style={{ color: '#FFF' }} onClick={clickToggleMenu}>
                <BsThreeDotsVertical fontSize="20px" />
              </button>
            </div>
          </Overlay>
        )}
        {toggleMenu && (
          <Menu>
            <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button style={{ padding: '0', height: '100%' }} onClick={clickToggleMenu}>
                <IoCloseOutline style={{ fontSize: '18px' }} />
              </button>
            </div>
            <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button style={{ fontSize: '12px', padding: '0' }}>공유하기</button>
            </div>
          </Menu>
        )}
      </ImageBox>
    </>
  )
}

const ImageBox = styled.div`
  position: relative;
  max-width: 160px;
  max-height: 270px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
`
const ImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  transition: all 0.3s ease-in-out;
`

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  border: 1px solid #c4c4c4;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export default OneImageCard
