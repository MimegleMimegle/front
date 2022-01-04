import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { likeApi } from '../../shared/api'
import { history } from '../../redux/ConfigureStore'

import ShareBottomSheet from '../ShareBottomSheet'

import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const OneImageCard = ({ image }) => {
  const [hover, setHover] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [likeCount, setLikeCount] = useState(image.likeCnt)
  const [isLiked, setIsLiked] = useState(image.isLike)
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false)

  const clickToggleMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setToggleMenu(!toggleMenu)
  }

  const handleBottomSheetVisible = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBottomSheetVisible(true)
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await likeApi
        .likeBoard(image.boardId)
        .then((response) => {
          console.log(response.data)
          setIsLiked(false)
          setLikeCount(likeCount - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await likeApi
        .likeBoard(image.boardId)
        .then((response) => {
          console.log(response.data)
          setIsLiked(true)
          setLikeCount(likeCount + 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }

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
        onClick={() => {
          history.push(`/image/detail/${image && image.boardId}`)
        }}
      >
        <ImageThumbnail src={image && image.thumbNail}></ImageThumbnail>
        {/* {hover && ( */}
        <Overlay className={`${hover ? 'active' : 'in-active'}`}>
          <div style={{ width: '100%', height: '100%', padding: '7px 7px 5px 7px', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'right' }}>
              <button style={{ color: '#FFF', zIndex: '1000', padding: '0' }} onClick={handleBottomSheetVisible}>
                <MdShare fontSize="18px" />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button style={{ color: '#FFF', zIndex: '1000', padding: '0 3px 0 0' }}>
                {isLiked ? <HiHeart style={{ fontSize: '18px' }} onClick={handleClickLike} /> : <HiOutlineHeart style={{ fontSize: '18px' }} onClick={handleClickLike} />}
              </button>
              <span style={{ color: '#FFF', fontSize: '9px' }}>{likeCount}</span>
            </div>
          </div>
        </Overlay>
        {/* )} */}
        {/* 공유하기 바텀 시트 완성되면 삭제 예정! */}
        {/* {toggleMenu && (
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
        )} */}
      </ImageBox>
      {bottomSheetVisible && <ShareBottomSheet bottomSheetVisible={bottomSheetVisible} setBottomSheetVisible={setBottomSheetVisible} />}
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
  .active {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
    transition: all 0.3s ease-in-out;
  }
  .inactive {
    display: none;
  }
`
const ImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div``
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
