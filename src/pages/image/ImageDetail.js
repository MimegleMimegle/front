import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { history } from '../../redux/ConfigureStore'
import { imageApi } from '../../shared/api'
import { likeApi } from '../../shared/api'
import { actionCreators as mypageActions } from '../../redux/modules/mypage'

import Grid from '../../elements/Grid'
import ConfirmModal from '../../components/modal/ConfirmModal'
import ImageWrapper from '../../components/image/ImageWrapper'
import ShareBottomSheet from '../../components/ShareBottomSheet'

import { ReactComponent as CloseIcon } from '../../styles/icons/size(28*28)(30*30)/close_28dp.svg'
import { ReactComponent as DeleteIcon } from '../../styles/icons/size(28*28)(30*30)/bin_28dp.svg'
import { ReactComponent as ShareIcon } from '../../styles/icons/size(28*28)(30*30)/share_28dp.svg'
import { ReactComponent as EmptyHeartIcon } from '../../styles/icons/size(28*28)(30*30)/heart_blank_28dp.svg'
import { ReactComponent as FullHeartIcon } from '../../styles/icons/size(28*28)(30*30)/heart_filled_28dp.svg'

const ImageDetail = (props) => {
  const dispatch = useDispatch()
  const boardId = useParams().imageId
  const profile = useSelector((state) => state.mypage.myProfile)

  const [imageData, setImageData] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [createdAt, setCreatedAt] = useState('')
  const [thumbNail, setThumbNail] = useState('')
  const [shareVisible, setShareVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const handleShareVisible = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareVisible(!shareVisible)
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await likeApi
        .likeBoard(boardId)
        .then((response) => {
          setIsLiked(false)
          setLikeCount(likeCount - 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 취소 문제 발생', error.response)
        })
    } else {
      await likeApi
        .likeBoard(boardId)
        .then((response) => {
          setIsLiked(true)
          setLikeCount(likeCount + 1)
        })
        .catch((error) => {
          console.log('이미지 좋아요 문제 발생', error.response)
        })
    }
  }

  const handleDeleteImage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await imageApi
      .deleteImage(boardId)
      .then((response) => {})
      .then(() => {
        window.location.replace('/image')
      })
      .catch((error) => {
        console.log('이미지 삭제 문제 발생', error.response)
      })
  }

  useEffect(() => {
    imageApi
      .getImageDetail(boardId)
      .then((response) => {
        const image_data = response.data.data
        setImageData(image_data)
        setLikeCount(image_data.likeCnt)
        setIsLiked(image_data.isLike)
        setThumbNail(image_data.thumbNail)
        const createdDate = image_data.createdAt.split('T')[0]
        setCreatedAt(createdDate)
      })
      .catch((error) => {
        console.log('상세 이미지를 불러오는 데 문제가 발생했습니다.', error.response)
      })
    dispatch(mypageActions.getUserProfileDB())
  }, [])

  return (
    <>
      <ImageWrapper>
        <Grid flex_between padding="0 16px">
          <CloseIcon
            className="icon"
            onClick={() => {
              history.replace('/image')
            }}
          />
        </Grid>
        <Grid flex_between padding="16px">
          <Grid flex_align>
            <ProfileImage src={imageData.profileImageUrl} />
            <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <ImageWriter>{imageData.writer}</ImageWriter>
              <ImageCreatedAt>{createdAt}</ImageCreatedAt>
            </div>
          </Grid>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShareIcon className="icon" onClick={handleShareVisible} />
            {imageData && profile && imageData.writer === profile.nickname && <DeleteIcon className="icon" style={{ margin: '0 0 0 16px' }} onClick={handleShowModal} />}
          </div>
        </Grid>
        <Grid flex_center height="fit-content" overflow="hidden">
          <img src={imageData.thumbNail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid flex_align padding="10px 16px 16px">
          {isLiked ? <FullHeartIcon className="icon" onClick={handleClickLike} /> : <EmptyHeartIcon className="icon" onClick={handleClickLike} />}
          <ImageLikeCount>{likeCount}</ImageLikeCount>
        </Grid>
        <ShareBottomSheet type="image" shareVisible={shareVisible} setShareVisible={setShareVisible} thumbNail={thumbNail} boardId={boardId} />
      </ImageWrapper>
      {showModal && (
        <ConfirmModal question="밈짤을 삭제하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <DeleteButton onClick={handleDeleteImage}>삭제</DeleteButton>
        </ConfirmModal>
      )}
    </>
  )
}

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const ImageWriter = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.white};
`
const ImageCreatedAt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.white};
`
const ImageLikeCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  padding: 0 0 0 5px;
`

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default ImageDetail
