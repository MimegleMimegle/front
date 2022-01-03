import React from 'react'
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
            className="icon-button"
            onClick={() => {
              history.go('/image')
            }}
          >
            <IoCloseOutline style={{ fontSize: '24px', color: '#FFF' }} />
          </button>
          <button style={{ color: '#FFF' }} onClick={handleUploadImage}>
            완료
          </button>
        </div>
        <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center' }}>
          <img src={preview} style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
        </div>
      </ImageWrapper>
    </>
  )
}

export default ImageUpload
