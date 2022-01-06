import React from 'react'
import styled from 'styled-components'
import { history } from '../../redux/ConfigureStore'
import { imageApi } from '../../shared/api'

import { ReactComponent as DeleteIcon } from '../../styles/icons/delete_black_18dp.svg'
import { ReactComponent as EmptyHeart } from '../../styles/icons/좋아요 비활성_18dp.svg'

const MyPageOneImageCard = ({ image }) => {
  const boardId = image && image.boardId
  const createdDate = image && image.createdAt.split('T')[0]

  const handleDeleteImage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await imageApi
      .deleteImage(boardId)
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        window.location.reload()
        // history.go('/mypage')
      })
      .catch((error) => {
        console.log('이미지 삭제 문제 발생', error.response)
      })
  }

  // 이미지 삭제 시 확인하는 알럿!!

  return (
    <>
      <Wrapper
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          history.push(`/image/detail/${image.boardId}`)
        }}
      >
        <div className="container">
          <ImageSection>
            <Image src={image && image.thumbNail} />
            <div>
              <button style={{ padding: '0' }} onClick={handleDeleteImage}>
                <DeleteIcon />
              </button>
            </div>
          </ImageSection>
          <LikeSection>
            <button style={{ padding: '0 0 0 2px' }}>
              <EmptyHeart />
            </button>
            <span style={{ fontSize: '9px', paddingLeft: '4px' }}>{image && image.likeCnt}</span>
          </LikeSection>
          <DateSection>
            <p style={{ fontSize: '9px', textAlign: 'right', paddingTop: '7px' }}>{image && createdDate}</p>
          </DateSection>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  max-width: 180px;
  width: 100%;
  height: 170px;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const ImageSection = styled.div`
  display: flex;
`

const Image = styled.div`
  max-width: 130px;
  width: 100%;
  height: 110px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
`

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0 0;
`

const DateSection = styled.div`
  height: 100%;
`

export default MyPageOneImageCard
