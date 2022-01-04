import React from 'react'
import styled from 'styled-components'

import { history } from '../../redux/ConfigureStore'
import { imageApi } from '../../shared/api'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineHeart } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

const MyPageOneImageCard = ({ image }) => {
  const tempImgUrl = 'https://image.idus.com/image/files/92e848f447904facb3fb7fcf5b3cdf6a_1080.jpg'

  const boardId = image && image.boardId

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
        window.location.reload()
        // history.go('/mypage')
      })
      .catch((error) => {
        console.log('이미지 삭제 문제 발생', error.response)
      })
  }

  return (
    <>
      <Wrapper
        onClick={() => {
          history.push(`/image/detail/${image.boardId}`)
        }}
      >
        <div className="container">
          <ImageSection>
            <Image src={image && image.thumbNail} />
            <div>
              <button style={{ padding: '0' }} onClick={handleToggleMenu}>
                <BsThreeDotsVertical style={{ fontSize: '18px' }} />
              </button>
            </div>
          </ImageSection>
          <LikeSection>
            <button style={{ padding: '0 0 0 2px' }}>
              <HiOutlineHeart style={{ fontSize: '16px' }} />
            </button>
            <span style={{ fontSize: '9px', paddingLeft: '4px' }}>{image && image.likeCnt}</span>
          </LikeSection>
          <DateSection>
            <p style={{ fontSize: '9px', textAlign: 'right', paddingTop: '7px' }}>{image && image.createdAt}</p>
          </DateSection>
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
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  max-width: 152.5px;
  width: 100%;
  height: 170px;
  padding: 8px;
  border: 1px solid #111;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const Menu = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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

const ImageSection = styled.div`
  display: flex;
`

const Image = styled.div`
  max-width: 118px;
  width: 100%;
  height: 106px;
  border: 1px solid #111;
  /* background-color: salmon; */
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
