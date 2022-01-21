import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { likeApi } from '../../shared/api'
import { history } from '../../redux/ConfigureStore'

import ShareBottomSheet from '../ShareBottomSheet'
import Grid from '../../elements/Grid'

import { ReactComponent as ShareIcon } from '../../styles/icons/share.svg'
import { ReactComponent as EmptyHeartIcon } from '../../styles/icons/heart_blank.svg'
import { ReactComponent as FullHeartIcon } from '../../styles/icons/heart_filled.svg'

const OneImageCard = ({ image, type }) => {
  const boardId = image.boardId

  const [hover, setHover] = useState(false)
  const [likeCount, setLikeCount] = useState(image.likeCnt)
  const [isLiked, setIsLiked] = useState(image.isLike)
  const [shareVisible, setShareVisible] = useState(false)
  const [thumbNail, setThumbNail] = useState(image ? image.thumbNail : '')

  const handleShareVisible = (e) => {
    e.stopPropagation()
    setShareVisible(!shareVisible)
  }

  const handleClickLike = async (e) => {
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
        }}
        onClick={() => {
          history.push(`/image/detail/${image && image.boardId}`)
        }}
      >
        <ImageThumbnail src={image && image.thumbNail}></ImageThumbnail>
        {/* {hover && ( */}
        <Overlay className={`${hover ? 'active' : 'inactive'}`}>
          <Grid flex_between column height="100%" padding="6px">
            <Grid flex_end>
              <ShareIcon fill="#FFF" width="24px" onClick={handleShareVisible} />
            </Grid>
            <Grid flex_start>
              {isLiked ? <FullHeartIcon fill="#FFF" onClick={handleClickLike} /> : <EmptyHeartIcon fill="#FFF" onClick={handleClickLike} />}
              <span className="like-count">{likeCount}</span>
            </Grid>
          </Grid>
        </Overlay>
      </ImageBox>
      <ShareBottomSheet type="image" shareVisible={shareVisible} setShareVisible={setShareVisible} thumbNail={thumbNail} boardId={boardId} />
    </>
  )
}

const ImageBox = styled.div`
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;
  margin-bottom: 7px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  .active {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
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

const Overlay = styled.div`
  .like-count {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: 0 0 0 3px;
  }
`

export default OneImageCard
