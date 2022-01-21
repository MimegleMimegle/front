import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { useDispatch } from 'react-redux'
import { actionCreators as imageActions } from '../../redux/modules/image'

import Grid from '../../elements/Grid'
import ConfirmModal from '../../components/modal/ConfirmModal'
import ImageWrapper from '../../components/image/ImageWrapper'
import { IoCloseOutline } from 'react-icons/io5'
import { ReactComponent as CloseIcon } from '../../styles/icons/X_24dp.svg'

const ImageUpload = ({ preview, fileInput }) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = React.useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const handleUploadImage = () => {
    const uploadFile = fileInput.current.files[0]
    dispatch(imageActions.uploadImageDB(uploadFile))
    setShowModal(!showModal)
  }

  return (
    <>
      <ImageWrapper>
        <Grid flex_between padding="0 16px 16px">
          <CloseIcon
            className="icon"
            onClick={() => {
              history.go('/image')
            }}
          />
          <UploadButton onClick={handleShowModal}>등록</UploadButton>
        </Grid>
        <Grid height="fit-conent" overflow="hidden">
          <img src={preview} style={{ width: '100%', objectFit: 'cover' }} />
        </Grid>
      </ImageWrapper>
      {showModal && (
        <ConfirmModal question="밈짤을 게시하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <SubmitButton onClick={handleUploadImage}>게시</SubmitButton>
        </ConfirmModal>
      )}
    </>
  )
}

const UploadButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
`

const SubmitButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default ImageUpload
