import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { imageApi } from '../../shared/api'
import { actionCreators as imageActions } from '../../redux/modules/image'

import Grid from '../../elements/Grid'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import InfinityScroll from '../../shared/InfinityScroll'
import Masonry from 'react-masonry-css'
import ImageUpload from '../image/ImageUpload'
import OneImageCard from '../../components/image/OneImageCard'
import FloatingButton from '../../components/FloatingButton'
import CircularProgress from '@mui/material/CircularProgress'
import { GoPlus } from 'react-icons/go'

const ImageList = (props) => {
  const dispatch = useDispatch()
  const fileInput = useRef('')
  const image_data = useSelector((state) => state.image)

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bestImageList, setBestImageList] = useState([])

  const getImageList = () => {
    dispatch(imageActions.getImageListDB(image_data.page))
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
    setTimeout(() => setLoading(false), 400)
  }, [])

  return (
    <>
      <Header location="짤방"></Header>
      <Wrapper>
        {!loading ? (
          <>
            <PopularSection>
              <div className="title-border">
                <Title>명예의 밈짤</Title>
              </div>
              <Container>
                <PopularGridLayout>
                  {bestImageList.map((image) => {
                    return <OneImageCard type="popular" key={image.boardId} image={image} />
                  })}
                </PopularGridLayout>
              </Container>
            </PopularSection>
            <GeneralSection>
              <div className="title-border">
                <Title>짤 방앗간</Title>
              </div>
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
        <FloatingButton>
          <FileUploader>
            <label htmlFor="file" className="upload-label">
              <GoPlus style={{ fontSize: '32px', color: '#FFF' }} />
            </label>
            <input type="file" id="file" className="upload-file" accept="image/*" ref={fileInput} onChange={handleChangeFile} />
          </FileUploader>
        </FloatingButton>
      </Wrapper>
      <Footer />
    </>
  )
}

const FileUploader = styled.div`
  /* padding: 0 5px 0 0; */
  .upload-label {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }
  .upload-file {
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: -1px;
    width: 1px;
    height: 1px;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  height: 100%;
  padding: 60px 0 0;
  .title-border {
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: normal;
  font-family: 'YdestreetB';
  font-style: normal;
  font-weight: normal;
  background-image: linear-gradient(transparent 60%, #ffe330 40%);
`

const PopularSection = styled.div`
  width: 100%;
  padding: 16px;
`

const GeneralSection = styled.div`
  width: 100%;
  padding: 16px 16px 84px;
`

const Container = styled.div`
  padding: 24px 0 0;
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

export default ImageList
