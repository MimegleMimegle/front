import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { imageApi } from '../../shared/api'
import { actionCreators as imageActions } from '../../redux/modules/image'
import { history } from '../../redux/ConfigureStore'

import Grid from '../../elements/Grid'
import Title from '../../elements/Title'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InfinityScroll from '../../shared/InfinityScroll'
import Masonry from 'react-masonry-css'
import ImageUpload from '../image/ImageUpload'
import OneImageCard from '../../components/image/OneImageCard'
import ConfirmModal from '../../components/modal/ConfirmModal'
import SpeedDialButton from '../../components/SpeedDialButton'
import CircularProgress from '@mui/material/CircularProgress'
import { RiEditLine } from 'react-icons/ri'

const ImageList = (props) => {
  const dispatch = useDispatch()
  const fileInput = useRef('')
  const image_data = useSelector((state) => state.image)

  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const isLogin = userId !== null && token !== null ? true : false

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bestImageList, setBestImageList] = useState([])
  const [showModal, setShowModal] = useState(false)

  const getImageList = () => {
    dispatch(imageActions.getImageListDB(image_data.page))
  }

  const handleClickWrite = () => {
    if (!isLogin) {
      setShowModal(true)
    }
  }

  const handleChangeFile = (e) => {
    setPreview(e.target.value)
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      const file = reader.result

      if (file) {
        let fileInfo = file.toString()
        setPreview(fileInfo)
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
    dispatch(imageActions.initImageList())
  }, [])

  useEffect(() => {
    dispatch(imageActions.getImageListDB(0))
    imageApi
      .getBestImageList()
      .then((response) => {
        setBestImageList(response.data.data.slice(0, 3))
      })
      .catch((error) => {
        console.log('명예의 전당 이미지 불러오기 문제 발생', error.response)
      })
  }, [])

  return (
    <>
      <Wrapper>
        <Header location="짤방"></Header>

        {!loading ? (
          <>
            <PopularSection>
              <Title>명예의 밈짤</Title>
              <Container>
                <PopularGridLayout>
                  {bestImageList.map((image) => {
                    return <OneImageCard type="popular" key={image.boardId} image={image} />
                  })}
                </PopularGridLayout>
              </Container>
            </PopularSection>
            <GeneralSection>
              <Title>짤 방앗간</Title>
              <Container>
                <InfinityScroll callNext={getImageList} paging={{ next: image_data.has_next }}>
                  <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                    {image_data.image_list.map((image) => {
                      return <OneImageCard key={image.boardId} image={image} />
                    })}
                  </Masonry>
                </InfinityScroll>
              </Container>
            </GeneralSection>
          </>
        ) : (
          <Grid flex_center height="100%">
            <CircularProgress color="inherit" />
          </Grid>
        )}
        {preview && <ImageUpload preview={preview} fileInput={fileInput} />}
        <SpeedDialButton _onClick={handleClickWrite}>
          {isLogin ? (
            <>
              <FileInputLabel htmlFor="file" className="upload-label">
                <RiEditLine size="28" fill="#FFFFFF" />
              </FileInputLabel>
              <FileInput type="file" id="file" className="upload-file" accept="image/*" ref={fileInput} onChange={handleChangeFile} />
            </>
          ) : (
            <RiEditLine size="28" fill="#FFFFFF" />
          )}
        </SpeedDialButton>
        <Footer />
      </Wrapper>
      <ConfirmModal showModal={showModal} setShowModal={setShowModal} title="로그인 후 이용 가능합니다!" question="로그인 페이지로 이동하시겠어요?">
        <MoveLoginButton onClick={() => history.push('/login')}>이동</MoveLoginButton>
      </ConfirmModal>
    </>
  )
}

const FileInputLabel = styled.label`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const FileInput = styled.input`
  position: absolute;
  overflow: hidden;
  padding: 0;
  margin: -1px;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: 100%;
  padding: 60px 0 0;
`

const PopularSection = styled.div`
  width: 100%;
  padding: 16px;
`

const GeneralSection = styled.div`
  width: 100%;
  padding: 0 16px 90px;
`

const Container = styled.div`
  padding: 20px 0 0;
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -7px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 7px; /* gutter size */
    background-clip: padding-box;
  }
`

const PopularGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: minmax(100px, 180px);
  column-gap: 7px;

  div {
    &:nth-child(1) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    &:nth-child(2) {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
    &:nth-child(3) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
  }
`

const MoveLoginButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default ImageList
