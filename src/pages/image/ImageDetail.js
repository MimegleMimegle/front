import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { history } from '../../redux/ConfigureStore'
import { imageApi } from '../../shared/api'
import { userApi } from '../../shared/api'
import { likeApi } from '../../shared/api'
import ImageWrapper from '../../components/image/ImageWrapper'
import ShareMenu from '../../components/image/ShareMenu'
import ThreeDotsMenu from '../../components/image/ThreeDotsMenu'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'

const ImageDetail = (props) => {
  const boardId = useParams().imageId

  const [imageData, setImageData] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [shareToggleMenu, setShareToggleMenu] = useState(false)
  const [threeDotsToggleMenu, setThreeDotsToggleMenu] = useState(false)
  const [profile, setProfile] = useState(null)
  const [createdAt, setCreatedAt] = useState('')

  const handleShareToggleMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareToggleMenu(!shareToggleMenu)
  }

  const handleThreeDotsToggleMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setThreeDotsToggleMenu(!threeDotsToggleMenu)
  }

  const handleClickLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLiked) {
      await likeApi
        .likeBoard(boardId)
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
        .likeBoard(boardId)
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

  const handleDeleteImage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await imageApi
      .deleteImage(boardId)
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        history.push('/image')
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
        const createdDate = image_data.createdAt.split('T')[0]
        setCreatedAt(createdDate)
      })
      .catch((error) => {
        console.log('상세 이미지를 불러오는 데 문제가 발생했습니다.', error.response)
      })
    userApi
      .getProfileInfo()
      .then((response) => {
        setProfile(response.data.data)
      })
      .catch((error) => {
        console.log('프로필 정보 문제 발생', error.response)
      })
  }, [])

  return (
    <>
      <ImageWrapper>
        <div style={{ width: '100%', padding: '0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => {
              history.goBack()
            }}
            style={{ padding: '0' }}
          >
            <IoCloseOutline style={{ fontSize: '24px' }} />
          </button>
        </div>
        <div style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <ProfileImage src={imageData.profileImageUrl} />
            <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column' }}>
              <p style={{ cursor: 'pointer', fontSize: '14px', color: '#FFF' }}>{imageData.writer}</p>
              <p style={{ fontSize: '9px', color: '#FFF' }}>{createdAt}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={handleShareToggleMenu}>
              <MdShare style={{ fontSize: '20px' }} />
            </button>
            {imageData && profile && imageData.writer === profile.nickname && (
              <button onClick={handleDeleteImage}>
                <MdOutlineDelete style={{ fontSize: '20px' }} />
              </button>
            )}
          </div>
        </div>
        <div style={{ width: '100%', height: '70%', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <img src={imageData.thumbNail} style={{ width: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '100%', padding: '5px 10px 0', display: 'flex', alignItems: 'center' }}>
          <button>{isLiked ? <HiHeart style={{ fontSize: '20px' }} onClick={handleClickLike} /> : <HiOutlineHeart style={{ fontSize: '20px' }} onClick={handleClickLike} />}</button>
          <span style={{ color: '#FFF', fontSize: '14px' }}>{likeCount}</span>
        </div>
        {shareToggleMenu && <ShareMenu handleShareToggleMenu={handleShareToggleMenu} imageUrl={imageData.thumbNail} />}
        {/* 토글 메뉴 없이 휴지통 아이콘으로 수정할 건지 확인 필요 */}
        {/* {threeDotsToggleMenu && <ThreeDotsMenu boardId={boardId} handleThreeDotsToggleMenu={handleThreeDotsToggleMenu} />} */}
      </ImageWrapper>
    </>
  )
}

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #111;
  border-radius: 20px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  cursor: pointer;
  background-color: #fff;
`

export default ImageDetail
