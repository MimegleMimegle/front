import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { history } from '../redux/ConfigureStore'
import { actionCreators as userActions } from '../redux/modules/user'

import Grid from '../elements/Grid'
import BottomPopup from './BottomPopup'
import ConfirmModal from './modal/ConfirmModal'

const ProfileBottom = ({ profile, showProfile, setShowProfile }) => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(!showModal)
  }

  const handleClickLogOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(userActions.logOutDB())
    setShowModal(false)
  }

  return (
    <>
      <BottomPopup isOpen={showProfile} onClose={() => setShowProfile(false)} heightPixel={200}>
        <Container>
          <Grid flex_center>
            <Handler />
          </Grid>
          <Grid flex_center column padding="16px 0 10px" borderBottom="1px solid #e5e5e5">
            <ProfileImage src={profile?.profileImage} />
            <Nickname>{profile?.nickname}</Nickname>
          </Grid>
          <Grid flex_around padding="16px 20px">
            <Button className="logout" onClick={handleShowModal}>
              로그아웃
            </Button>
            <Button
              className="mypage"
              onClick={() => {
                history.push('/mypage')
              }}
            >
              마이페이지
            </Button>
          </Grid>
        </Container>
      </BottomPopup>

      {showModal && (
        <ConfirmModal question="로그아웃 하시겠어요?" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <LogOutButton onClick={handleClickLogOut}>로그아웃</LogOutButton>
        </ConfirmModal>
      )}
    </>
  )
}

const Container = styled.div`
  padding: 5px 0 0;
  width: 100%;
  height: 200px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  z-index: 10001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Handler = styled.div`
  width: 40px;
  height: 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.line};
`

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const Nickname = styled.div`
  padding: 5px 0 0;
  font-weight: 500;
  cursor: default;
`

const Button = styled.button`
  border-radius: 20px;
  padding: 8px 0;
  width: 100px;
  height: auto;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  &.mypage {
    background-color: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      background-color: #4b83f4;
    }
  }
  &.logout {
    background-color: ${({ theme }) => theme.colors.line};
    color: #333;
    &:hover {
      background-color: #dcdcdc;
    }
  }
`

const LogOutButton = styled.button`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue};
`

export default ProfileBottom
