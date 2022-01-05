import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { useDispatch } from 'react-redux'
import { actionCreators as imageActions } from '../../redux/modules/image'

import ImageWrapper from '../../components/image/ImageWrapper'

import { IoCloseOutline } from 'react-icons/io5'

const ImageUpload = ({ preview, fileInput }) => {
  const dispatch = useDispatch()

  console.log(fileInput.current.files[0])

  const handleUploadImage = () => {
    const uploadFile = fileInput.current.files[0]
    dispatch(imageActions.uploadImageDB(uploadFile))
  }

  return (
    <>
      <ImageWrapper>
        <div style={{ width: '100%', padding: '0 15px 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => {
              history.go('/image')
            }}
          >
            <IoCloseOutline style={{ fontSize: '24px', color: '#FFF' }} />
          </button>
          <UploadButton onClick={handleUploadImage}>등록</UploadButton>
        </div>
        <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center' }}>
          <img src={preview} style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
        </div>
      </ImageWrapper>
    </>
  )
}

const UploadButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
`

export default ImageUpload
