import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { imageApi } from '../../shared/api'

import InfinityScroll from '../../shared/InfinityScroll'
import ImageUpload from '../image/ImageUpload'
import OneImageCard from '../../components/image/OneImageCard'
import PopularOneImageCard from '../../components/image/PopularOneImageCard'

import { actionCreators as imageActions } from '../../redux/modules/image'

const ImageList = (props) => {
  const dispatch = useDispatch()

  const fileInput = useRef('')

  const [preview, setPreview] = useState(null)
  const [bestImageList, setBestImageList] = useState([])
  const [imageTotalLength, setImageTotalLength] = useState(0)

  const image_data = useSelector((state) => state.image)
  const image_list = image_data && image_data.image_list
  const page = image_data && image_data.page

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

  /* 무한 스크롤 구현 끝나면 getImageListDB 파라미터에 page 정보 넘겨주기! */
  useEffect(() => {
    if (image_list.length < 2) {
      dispatch(imageActions.getImageListDB())
    }
    imageApi
      .giveMeTotalLength()
      .then((response) => {
        setImageTotalLength(response.data.data)
      })
      .catch((error) => {
        console.log('이미지 총 개수 불러오기 문제 발생', error.response)
      })
    imageApi
      .getBestImageList()
      .then((response) => {
        setBestImageList(response.data.data)
      })
      .catch((error) => {
        console.log('명예의 전당 이미지 불러오기 문제 발생', error.response)
      })
  }, [dispatch])

  return (
    <>
      <Wrapper>
        <div>
          <input type="file" accept="image/*" ref={fileInput} onChange={handleChangeFile} />
        </div>
        <PopularSection>
          <div style={{ borderBottom: '1px solid #e5e5e5' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>명예의 전당</h2>
          </div>
          <Container>
            <PopularGridLayout>
              {bestImageList.length > 0 &&
                bestImageList.map((image) => {
                  return <OneImageCard key={image.boardId} image={image} />
                })}
            </PopularGridLayout>
          </Container>
        </PopularSection>
        <GeneralSection>
          <div style={{ borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700' }}>짤 방앗간</h2>
          </div>
          <Container>
            <GeneralGridLayout>
              {image_list.length > 0 &&
                image_list.map((image) => {
                  return <OneImageCard key={image.boardId} image={image} />
                })}
            </GeneralGridLayout>
          </Container>
        </GeneralSection>
      </Wrapper>
      {preview && <ImageUpload preview={preview} fileInput={fileInput} />}
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PopularSection = styled.div`
  width: 100%;
  padding: 20px 20px;
`

const GeneralSection = styled.div`
  width: 100%;
  padding: 20px 20px 0;
  .sort-button {
    margin: 0 4px;
    width: 100%;
    height: 20px;
    border: 1px solid #585858;
    border-radius: 10px;
    font-size: 9px;
  }
  .active {
    transition: all 0.3s ease-in-out;
    color: #fff;
    background-color: #585858;
  }
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
  gap: 8px;
`

export default ImageList
