import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { imageApi } from '../../shared/api'
import { actionCreators as imageActions } from '../../redux/modules/image'

import Header from '../../components/Header'
import InfinityScroll from '../../shared/InfinityScroll'
import ImageUpload from '../image/ImageUpload'
import OneImageCard from '../../components/image/OneImageCard'
import SpinningCircles from '../../styles/image/spinning-circles.svg'
import { AiOutlinePlus } from 'react-icons/ai'

const ImageList = (props) => {
  const dispatch = useDispatch()

  const fileInput = useRef('')

  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bestImageList, setBestImageList] = useState([])

  const image_data = useSelector((state) => state.image)

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
    setTimeout(() => setLoading(false), 1000)
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
      <Header type="ImageList" location="짤방">
        <FileUploader>
          <label htmlFor="file" className="upload-label">
            <AiOutlinePlus style={{ fontSize: '22px' }} />
          </label>
          <input type="file" id="file" className="upload-file" accept="image/*" ref={fileInput} onChange={handleChangeFile} />
        </FileUploader>
      </Header>
      <Wrapper>
        {!loading ? (
          <>
            <PopularSection>
              <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '5px' }}>
                <Title>명예의 밈짤</Title>
              </div>
              <Container>
                {loading ? (
                  <div style={{ width: '100%', height: '294px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={SpinningCircles} />
                  </div>
                ) : (
                  <PopularGridLayout>
                    {bestImageList.map((image) => {
                      return <OneImageCard key={image.boardId} image={image} />
                    })}
                  </PopularGridLayout>
                )}
              </Container>
            </PopularSection>
            <GeneralSection>
              <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '5px' }}>
                <Title>짤 방앗간</Title>
              </div>
              <Container>
                <InfinityScroll callNext={getImageList} paging={{ next: image_data.has_next }}>
                  <GeneralGridLayout>
                    {image_data.image_list.map((image) => {
                      return <OneImageCard key={image.boardId} image={image} />
                    })}
                  </GeneralGridLayout>
                </InfinityScroll>
              </Container>
            </GeneralSection>
          </>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={SpinningCircles} />
          </div>
        )}
        {preview && <ImageUpload preview={preview} fileInput={fileInput} />}
      </Wrapper>
    </>
  )
}

const FileUploader = styled.div`
  .upload-label {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
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
`

const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  background-image: linear-gradient(transparent 60%, #ffe330 40%);
`

const PopularSection = styled.div`
  width: 100%;
  padding: 16px;
`

const GeneralSection = styled.div`
  width: 100%;
  padding: 16px 16px 0;
`

const Container = styled.div`
  padding: 24px 0 0;
`

const PopularGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 110px 152px;
  gap: 8px;

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

const GeneralGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(121px, 121px);
  gap: 3px;
`

export default ImageList
