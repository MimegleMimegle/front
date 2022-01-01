import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { history } from '../../redux/ConfigureStore'
import { imageApi } from '../../shared/api'
import { userApi } from '../../shared/api'

import ImageWrapper from '../../components/image/ImageWrapper'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdShare } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { HiHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const ImageDetail = (props) => {
  const dispatch = useDispatch()

  const tempImgUrl = 'https://t1.daumcdn.net/cfile/tistory/99F374385C14B20635'
  const boardId = useParams().imageId

  const [imageData, setImageData] = React.useState('')
  const [isMyImage, setIsMyImage] = React.useState(false)
  const [isLiked, setIsLiked] = React.useState(false)
  const [toggleMenu, setToggleMenu] = React.useState(false)

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleDeleteImage = async () => {
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

  React.useEffect(() => {
    imageApi
      .getImageDetail(boardId)
      .then((response) => {
        const image_data = response.data.data
        setImageData(image_data)
        setIsLiked(image_data.isLike)
      })
      .catch((error) => {
        console.log('상세 이미지를 불러오는 데 문제가 발생했습니다.', error.response)
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
          >
            <IoCloseOutline style={{ fontSize: '24px', color: '#FFF' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button>
              <MdShare style={{ fontSize: '20px', color: '#FFF' }} />
            </button>
            <button>
              <BsThreeDotsVertical style={{ fontSize: '20px', color: '#FFF' }} onClick={handleToggleMenu} />
            </button>
          </div>
        </div>
        <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center' }}>
          <img src={imageData.thumbNail} style={{ width: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ width: '100%', padding: '0 10px', display: 'flex', alignItems: 'center' }}>
          <button>
            <HiOutlineHeart style={{ fontSize: '22px', color: '#FFF' }} />
          </button>
          <span style={{ color: '#FFF', fontSize: '14px' }}>{imageData.likeCnt}</span>
        </div>
        {toggleMenu && (
          <Menu>
            <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button style={{ padding: '0', height: '100%' }} onClick={handleToggleMenu}>
                <IoCloseOutline style={{ fontSize: '18px' }} />
              </button>
            </div>
            <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
              <button style={{ fontSize: '12px', padding: '0' }} onClick={handleDeleteImage}>
                삭제하기
              </button>
            </div>
          </Menu>
        )}
      </ImageWrapper>
    </>
  )
}

const Menu = styled.div`
  position: absolute;
  top: 35px;
  right: 15px;
  width: 80px;
  height: 70px;
  border: 1px solid #c4c4c4;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export default ImageDetail
